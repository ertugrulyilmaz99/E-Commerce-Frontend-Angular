import { Component } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  productAddForm: FormGroup;
  constructor(private formBuilder:FormBuilder,
              private productService:ProductService,
              private toastrService:ToastrService) { }

  ngOnInit(): void{
    this.createProductAddForm();
  }

  createProductAddForm(){
    this.productAddForm = this.formBuilder.group({
      productName:["", Validators.required],
      unitPrice:["", Validators.required],
      unitsInStock:["", Validators.required],
      categoryId:["", Validators.required]
    })
  }

  add(){
    if(this.productAddForm.valid){
      console.log("adding product right now")
      let productModel = Object.assign({}, this.productAddForm.value)
      console.log(productModel)
      this.productService.add(productModel).subscribe(response=>{
        console.log(response);
        this.toastrService.success(response.message, "Success");
      }, responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            const element = responseError.error.Errors[i];
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, 
              "Validation Error");
          }
          
        }
      })
    }else{
      this.toastrService.error("Form is not valid.", "Check again.");
    }
  }

}
