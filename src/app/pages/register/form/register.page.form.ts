import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { findAddressNumber, findAddress, findCity, findCounty, findPostCode } from "src/app/utils/address-utils";

export class RegisterPageForm {

    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    createForm() : FormGroup {
        let form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6) ]],
            confirmPassword: [''] ,
            telephoneNumber: ['', Validators.required],
            address: this.formBuilder.group({
                Address: ['', Validators.required],
                number: ['', Validators.required],
                postCode: ['', Validators.required],
                city: ['', Validators.required],
                county: ['', Validators.required]
            })
        });

        form.get('confirmPassword')!.setValidators(matchPasswordAndConfirmPassword(form));

        return form;
    }

    setAddress(place: any) {
        const addressForm = this.form.get('address');

        addressForm?.get('Address')?.setValue(findAddress(place.address_components));
        addressForm?.get('number')?.setValue(findAddressNumber(place.address_components));
        addressForm?.get('postCode')?.setValue(findPostCode(place.address_components));
        addressForm?.get('city')?.setValue(findCity(place.address_components));
        addressForm?.get('county')?.setValue(findCounty(place.address_components));
    }

    getForm() : FormGroup {
        return this.form;
    }
}

function matchPasswordAndConfirmPassword(form: FormGroup) : ValidatorFn {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    const validator = () => {
        return password!.value == confirmPassword!.value ? null : {isntMatching: true}
    };
    return validator;
}