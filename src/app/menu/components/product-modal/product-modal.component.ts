import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { ICategory } from 'src/app/menu/types/category.interface';
import {
  categoriesSelector,
  newProductIngredientsSelector,
} from 'src/app/menu/store/selectors';
import {
  addIngredientAction,
} from 'src/app/menu/store/actions/add-ingredient.action';
import {
  deleteIngredientAction,
} from 'src/app/menu/store/actions/delete-ingredient.action';
import { IProduct } from 'src/app/menu/types/product.interface';
import {
  createNewProductAction,
} from 'src/app/menu/store/actions/create-new-product.action';
import {
  setProductModalStatusAction,
} from 'src/app/menu/store/actions/set-product-modal-status.action';
import { fill } from 'json-server-auth';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit, OnDestroy {
  public productForm!: FormGroup;
  public categories$!: Observable<ICategory[] | null>;
  public newProductsIngredients!: string[];
  private destroy$: Subject<any> = new Subject<any>();

  @ViewChild('ingredient') public ingredientFieldRef!: ElementRef;

  constructor (
    private store: Store<AppStateInterface>,
    private fb: FormBuilder,
  ) {}

  ngOnInit (): void {
    this.initializeValues();
    this.initializeForm();
  }

  private initializeValues () {
    this.categories$ = this.store.pipe(select(categoriesSelector),
      map(categories => {
        if (categories) {
          return categories.filter(c => c.id !== 'all');
        }
        return categories;
      }));
    this.store.pipe(
      select(newProductIngredientsSelector), takeUntil(this.destroy$)).
      subscribe(ingredients => {
        this.newProductsIngredients = ingredients;
      });
  }

  private initializeForm () {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      price: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  public onAddIngredient () {
    this.store.dispatch(addIngredientAction(
      { ingredient: this.ingredientFieldRef.nativeElement.value }));
    this.ingredientFieldRef.nativeElement.value = '';
  }

  public onDeleteIngredient (ingredient: string) {
    this.store.dispatch(deleteIngredientAction({ ingredient }));
  }

  public onSubmit () {
    const newProduct: IProduct = {
      title: this.productForm.value.title,
      category: this.productForm.value.category,
      price: this.productForm.value.price + ' грн',
      imageUrl: this.productForm.value.imageUrl,
      info: {
        description: this.productForm.value.description,
        ingredients: this.newProductsIngredients,
      },
    };

    this.store.dispatch(createNewProductAction({ newProduct }));
  }

  public onProductModalClose (event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.store.dispatch(setProductModalStatusAction({ value: false }));
    }
  }

  public ngOnDestroy (): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
