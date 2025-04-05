import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UserDto } from '../../dtos/UserDto';
import { LoginAndRegisterService } from '../../services/login-and-register.service';
import { UserService } from '../../services/user.service';
import { GlobalConstants } from '../../constants/global-constants';
import { UtilityComponentsService } from '../../services/utility-components.service';
import { CUSTOM_USER_PROFILE_SNACK_BAR_DATA } from '../../helpers/custom-snackbar-data';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  public defaultProfilePicImageName: string = GlobalConstants.DEFAULT_PROFILE_PIC_IMAGE_NAME;
  public selectedFile: File | null = null;

  @ViewChild('fileInput')
  private fileInput: ElementRef<HTMLInputElement> | undefined;

  public profilePicLocation?: string;
  public loggedInUserDetails: UserDto | null = null;
  userProfileFormGroup: FormGroup;

  private initialFormValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loginAndRegisterService: LoginAndRegisterService,
    private utilityComponentsService :UtilityComponentsService
  ) {
    this.userProfileFormGroup = this.formBuilder.group({
      firstName: new FormControl(this.initialFormValues.firstName, [Validators.required,Validators.minLength(3)]),
      lastName: new FormControl(this.initialFormValues.lastName),
      email: new FormControl({ value: this.initialFormValues.email, disabled: true },[Validators.required, Validators.minLength(5)]),
    });
  }

  ngOnInit(): void {
    console.log("Inside ngOnInit of ProfileComponent.")
    this.loginAndRegisterService.AuthDetailsBehaviourSubject.asObservable().subscribe(
      (value) => {
        console.log(`Inside ngOnInit of ProfileComponent : Consuming : isUserLoggedIn : Value = ${value.isUserLoggedIn}`)
        this.loggedInUserDetails = value.loggedInUserDetails;
        if (this.loggedInUserDetails) {
          this.profilePicLocation = this.updateProfilePicLocation(this.loggedInUserDetails);
          this.userProfileFormGroup.setValue({firstName: this.loggedInUserDetails?.firstName,lastName: this.loggedInUserDetails?.lastName,email: this.loggedInUserDetails?.email});
        }
      }
    );
  }

  private updateProfilePicLocation(user: UserDto): string {
    if (user?.profilePic === GlobalConstants.DEFAULT_PROFILE_PIC_IMAGE_NAME) {
      return GlobalConstants.DEFAULT_PROFILE_PIC_IMAGE_LOCATION;
    } else {
      const imageLocationURL = GlobalConstants.GET_PROFILE_PICTURE_BY_USERID_URL(user?.userId || '');
      //ADDING TIMESTAMP IN URL JUST TO PREVENT BROWSER FROM USING CASHED RESULT.
      return `${imageLocationURL}?timestamp=${Date.now()}`
    }
  }

  handleUpdate() {
    if (this.userProfileFormGroup.invalid) {
      this.utilityComponentsService.openCustomSnackBar(CUSTOM_USER_PROFILE_SNACK_BAR_DATA.USER_PROFILE_INPUT_VALIDATION_FAILED);
      return;
    }

    const { firstName, lastName, email, password} = this.userProfileFormGroup.value;
    const userDto = new UserDto(firstName,lastName,email,password);
    
    if(this.loggedInUserDetails?.userId){
      this.userService.updateUserByUserId(this.loggedInUserDetails.userId,userDto).subscribe({
        next:(updatedUser)=>{
          this.loginAndRegisterService.performOperationsAfterProfileUpdate(updatedUser)
          this.utilityComponentsService.openCustomSnackBar(CUSTOM_USER_PROFILE_SNACK_BAR_DATA.USER_PROFILE_UPDATED_SUCCESSFULLY)
        },error:(error)=>{
          console.log(error);
          this.utilityComponentsService.openCustomSnackBar(CUSTOM_USER_PROFILE_SNACK_BAR_DATA.USER_PROFILE_UPDATION_FAILED)
        }
      })
    }
  }

  handleProfilePictureRemove(){
    if(this.loggedInUserDetails?.userId){
      this.userService.removeProfilePicturByUserId(this.loggedInUserDetails.userId).subscribe({
        next:(apiResponseDto)=>{
          if(apiResponseDto.data?.user){
            this.loginAndRegisterService.performOperationsAfterProfileUpdate(apiResponseDto.data.user)
            this.utilityComponentsService.openCustomSnackBar(CUSTOM_USER_PROFILE_SNACK_BAR_DATA.USER_PROFILE_PIC_REMOVED_SUCCESSFULLY)
          }
        },error:(error)=>{
          console.log(error);
        }
      })
    }
  }

  handleOnFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  handleProfilePictureUpload(){
    if(this.selectedFile && this.loggedInUserDetails?.userId){
      const formData:FormData = new FormData();
      formData.append(GlobalConstants.DEFAULT_PROFILE_PIC_IMAGE_FORM_FIELD_NAME,this.selectedFile);

      this.userService.updateProfilePictureByUserId(this.loggedInUserDetails.userId,formData).subscribe({
        next:(apiResponseDto)=>{
          if(apiResponseDto.data?.user){
            this.loginAndRegisterService.performOperationsAfterProfileUpdate(apiResponseDto.data.user)
            this.clearFileInput()
            this.utilityComponentsService.openCustomSnackBar(CUSTOM_USER_PROFILE_SNACK_BAR_DATA.USER_PROFILE_PIC_UPDATED_SUCCESSFULLY)
          } 
        },error:(error)=>{
          console.log(error);
        }
      })
    }
  }

  clearFileInput() {
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  //This getter method will help you to access specific controls in the template file
  get controls() {
    return this.userProfileFormGroup.controls;
  }
}
