import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { DtoProductList } from '../../_dtos/dto-product-list';
import { Category } from '../../_models/category';
import { CategoryService } from '../../_services/category.service';
import { ProductService } from '../../_services/product.service';

import Swal from'sweetalert2'; // sweetalert

declare var $: any; // jquery

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  
  products: DtoProductList[] = []; 
  category: any | Category = new Category();
  categories: Category[] = []; 

  // formulario de registro
  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: ["", [Validators.required]],
  });

  submitted = false; // indica si se envió el formulario

  constructor(
    private categoryService: CategoryService, // servicio category de API
    private formBuilder: FormBuilder, // formulario
    private productService: ProductService, // servicio product de API
    private router: Router, // redirigir a otro componente
  ){}

  // primera función que se ejecuta
  ngOnInit(){
    this.getProducts();
  }

  ngOnSubmit(){ 
    // valida el formulario
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    this.productService.createProduct(this.form.value).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'center',
          icon: 'success',
          iconColor: '#30871a',
          title: '¡Producto registrado exitosamente!',
          color: '#30871a',
          background: '#e0ffce',
          showConfirmButton: false,
          timer: 2000
        });

        this.getProducts(); // consulta productos con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'center',
          icon: 'error',
          iconColor: 'brown',
          showConfirmButton: false,
          title: err.error.message,
          color: 'brown',
          background: '#f8a4a4',
          timer: 2000
        });
      }
    );
  }

  // CRUD product
  disableProduct(id: number){
    this.productService.disableProduct(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position:'center',
          icon: 'success',
          iconColor: '#30871a',
          title: '¡Producto desactivado exitosamente!',
          color: '#30871a',
          background: '#e0ffce',
          showConfirmButton: false,
          timer: 2000
        });

        this.getProducts(); // consulta productos con los cambios realizados
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'center',
          icon: 'error',
          iconColor: 'brown',
          showConfirmButton: false,
          title: err.error.message,
          color: 'brown',
          background: '#f8a4a4',
          timer: 2000
        });
      }
    );
  }

  enableProduct(id: number){
    this.productService.enableProduct(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'center',
          icon: 'success',
          iconColor: '#30871a',
          title: '¡Producto activado exitosamente!',
          color: '#30871a',
          background: '#e0ffce',
          showConfirmButton: false,
          timer: 2000
        });

        this.getProducts(); // consulta productos con los cambios realizados
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'center',
          icon: 'error',
          iconColor: 'brown',
          showConfirmButton: false,
          title: err.error.message,
          color: 'brown',
          background: '#f8a4a4',
          timer: 2000
        });
      }
    );
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      res => {
        this.products = res; // asigna la respuesta de la API a la lista de productos
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'center',
          icon: 'error',
          iconColor: 'brown',
          showConfirmButton: false,
          title: err.error.message,
          color: 'brown',
          background: '#f8a4a4',
          timer: 2000
        });
      }
    );
  }

  showProduct(gtin: string){
    this.router.navigate(['product/' + gtin]);
  }

  // catalogues
  getCategories(){
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res; // asigna la respuesta de la API a la lista de categories
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'center',
          icon: 'error',
          iconColor: 'brown',
          showConfirmButton: false,
          title: err.error.message,
          color: 'brown',
          background: '#f8a4a4',
          timer: 2000
        });
      }
    );
  }

  getCategory(id: number){
    this.categoryService.getCategory(id).subscribe(
      res => {
        this.category = res;
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'center',
          icon: 'error',
          iconColor: 'brown',
          showConfirmButton: false,
          title: err.error.message,
          color: 'brown',
          background: '#f8a4a4',
          timer: 2000
        });
      }
    )
  }

  // modals 
  showModalForm(){
    this.form.reset();
    this.submitted = false;
    this.getCategories();
    $("#modalForm").modal("show");
  }
}