import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';

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

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit, OnDestroy {
  public productForm!: FormGroup;
  public categories$!: Observable<ICategory[] | null>;
  public newProductIngredients!: string[];
  public selectedProduct!: IProduct | null;
  public newIngredient: string = '';
  private destroy$: Subject<any> = new Subject<any>();

  public constructor(
    private store: Store<AppStateInterface>,
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.initializeValues();
    this.initializeForm();
  }

  private initializeValues() {
    this.categories$ = this.store.pipe(
      select(categoriesSelector),
      map(categories => {
        if (categories) {
          return categories.filter(c => c.id !== 'all');
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
        this.selectedProduct ? this.selectedProduct.info.description : '',
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
      imageUrl: [
        this.selectedProduct ? this.selectedProduct.imageUrl : '',
        [Validators.required, Validators.pattern('^\\S(.*\\S)?$')],
      ],
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

  public onSubmit() {
    const newProduct: IProduct = {
      title: this.productForm.value.title,
      category: this.productForm.value.category,
      price: this.productForm.value.price + ' грн',
      imageUrl: this.productForm.value.imageUrl,
      info: {
        description: this.productForm.value.description,
        ingredients: this.newProductIngredients,
      },
    };

    if (this.selectedProduct) {
      this.store.dispatch(
        updateProductAction({
          product: newProduct,
          id: this.selectedProduct.id ? this.selectedProduct.id : 0,
        })
      );
    } else {
      this.store.dispatch(createNewProductAction({ newProduct }));
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

  public ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
