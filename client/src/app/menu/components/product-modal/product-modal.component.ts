import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

import { numberInputValidator } from 'src/app/auth/validators/number-input.validator';
import { addIngredientAction } from 'src/app/menu/store/actions/add-ingredient.action';
import { createNewProductAction } from 'src/app/menu/store/actions/create-new-product.action';
import { deleteIngredientAction } from 'src/app/menu/store/actions/delete-ingredient.action';
import { setProductIngredientsAction } from 'src/app/menu/store/actions/set-product-ingredients.action';
import { setProductModalStatusAction } from 'src/app/menu/store/actions/set-product-modal-status.action';
import { setSelectedProductAction } from 'src/app/menu/store/actions/set-selected-product.action';
import { updateProductAction } from 'src/app/menu/store/actions/update-product.action';
import {
  categoriesSelector,
  newProductIngredientsSelector,
  selectedProductSelector,
} from 'src/app/menu/store/selectors';
import { ICategory } from 'src/app/menu/types/category.interface';
import { IProduct } from 'src/app/menu/types/product.interface';
import { ConvertToBase64 } from 'src/app/shared/classes/convertToBase64';

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent
  extends ConvertToBase64
  implements OnInit, OnDestroy
{
  public productForm!: FormGroup;
  public categories$!: Observable<ICategory[] | null>;
  public category_id!: number;
  public newProductIngredients!: string[];
  public selectedProduct!: IProduct | null;
  public newIngredient: string = '';
  public newImage: File | null = null;
  public newImageUrl: string = '';
  public oldImage: File | null = null;
  protected readonly environment = environment;
  private destroy$: Subject<any> = new Subject<any>();

  public constructor(
    private store: Store<AppStateInterface>,
    private fb: FormBuilder
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initializeValues();
    this.initializeForm();
  }

  private initializeValues() {
    this.categories$ = this.store.pipe(
      select(categoriesSelector),
      map(categories => {
        if (categories) {
          return categories.filter(c => c.name !== 'all');
        }
        return categories;
      })
    );
    this.store
      .pipe(select(newProductIngredientsSelector), takeUntil(this.destroy$))
      .subscribe(ingredients => {
        this.newProductIngredients = ingredients;
      });
    this.store
      .pipe(select(selectedProductSelector), takeUntil(this.destroy$))
      .subscribe(selectedProduct => {
        this.selectedProduct = selectedProduct;
        this.oldImage = selectedProduct?.oldImg ? selectedProduct.oldImg : null;
      });
  }

  private initializeForm() {
    this.productForm = this.fb.group({
      title: [
        this.selectedProduct ? this.selectedProduct.title : '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^\\S(.*\\S)?$'),
        ],
      ],
      description: [
        this.selectedProduct ? this.selectedProduct.description : '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.pattern('^\\S(.*\\S)?$'),
        ],
      ],
      price: [
        this.selectedProduct ? this.selectedProduct.price.split(' ')[0] : '',
        [Validators.required, numberInputValidator],
      ],
      category: [
        this.selectedProduct ? this.selectedProduct.category : '',
        Validators.required,
      ],
      imageUrl: [null, this.oldImage ? null : Validators.required],
    });
  }

  public onChangeInput(e: any) {
    this.newIngredient = e.target.value;
  }

  public onAddIngredient() {
    this.store.dispatch(
      addIngredientAction({
        ingredient: this.newIngredient,
      })
    );
    this.newIngredient = '';
  }

  public onDeleteIngredient(ingredient: string) {
    this.store.dispatch(deleteIngredientAction({ ingredient }));
  }

  public onImgInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.newImage = (target.files as FileList)[0];
    if (this.newImage) {
      // Read the selected file as a data URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.newImage);
    }
  }

  public onSubmit() {
    // this function used to get id of selected category
    this.getCategoryId();

    const formData = new FormData();
    if (this.newImage) {
      formData.append('newImg', this.newImage);
    }

    if (!this.newImage && this.oldImage) {
      formData.append('newImg', this.oldImage);
    }

    if (this.oldImage) {
      formData.append('oldImg', this.oldImage);
    }

    formData.append('title', this.productForm.value.title);
    formData.append('category', this.productForm.value.category);
    formData.append('category_id', this.category_id.toString());
    formData.append('price', this.productForm.value.price + ' грн');
    formData.append('description', this.productForm.value.description);
    formData.append('ingredients', this.newProductIngredients.join(','));

    if (this.selectedProduct) {
      this.store.dispatch(
        updateProductAction({
          formData,
          id: this.selectedProduct.id ? this.selectedProduct.id : 0,
        })
      );
    } else {
      this.store.dispatch(createNewProductAction({ formData }));
    }
  }

  public onProductModalClose(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.store.dispatch(setProductModalStatusAction({ value: false }));
      if (this.selectedProduct) {
        this.store.dispatch(setSelectedProductAction({ product: null }));
        this.store.dispatch(setProductIngredientsAction({ ingredients: [] }));
      }
    }
  }

  public getCategoryId() {
    const categoryName = this.productForm.value.category;
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe(categories => {
      const searchedCategory = categories?.find(
        category => category.name === categoryName
      );
      if (searchedCategory) {
        this.category_id = searchedCategory.id;
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
