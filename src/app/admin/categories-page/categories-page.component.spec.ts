import { CategoriesPageComponent } from './categories-page.component';
import { CategoriesService } from '../../shared/services/categories.service';
import { AlertService } from '../shared/services/alert.service';
import { EMPTY, Observable, of } from 'rxjs';

describe('CategoriesPageComponent', () => {
  let component: CategoriesPageComponent;
  let service: CategoriesService;
  let alertService: AlertService;

  beforeEach(() => {
    service = new CategoriesService(null);
    component = new CategoriesPageComponent(service, alertService);
    alertService = new AlertService();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form have control', function () {
    const spy = spyOn(service, 'getAllCategories').and.callFake(() => {
      return EMPTY;
    });

    component.ngOnInit();

    expect(component.form.contains('name')).toBeTruthy();
  });

  it('should mark name as invalid if empty value', function () {
    const spy = spyOn(service, 'getAllCategories').and.callFake(() => {
      return EMPTY;
    });
    component.ngOnInit();
    let control = component.form.get('name');
    control.setValue('');

    expect(control.valid).toBeFalsy();
  });

  it('should add new category', function () {
    const spyGetAll = spyOn(service, 'getAllCategories').and.callFake(() => {
      return EMPTY;
    });
    const spyCreate = spyOn(service, 'create').and.callFake(() => {
      return of({
        name: 'Category',
        id: 'id',
        date: new Date(),
      });
    });
    component.ngOnInit();
    let control = component.form.get('name');
    control.setValue('Category');
    component.submit();

    expect(spyCreate).toHaveBeenCalled();
    expect(component.categories.length).toBe(1);
  });

  it('should delete category when use removeCategory and user confirm', function () {
    const spy = spyOn(service, 'remove').and.returnValue(EMPTY);
    spyOn(window, 'confirm').and.returnValue(true);

    component.removeCategory('10');

    expect(spy).toHaveBeenCalledWith('10');
  });

  it('should return data from backEnd', function () {
    const spy = spyOn(service, 'getAllCategories').and.returnValue(
      of([
        {
          name: 'Category',
          id: 'id',
          date: new Date(),
        },
        {
          name: 'Category2',
          id: 'id2',
          date: new Date(),
        },
      ])
    );

    component.ngOnInit();
    expect(component.categories.length).toBe(2);
  });

  it('should return null if form invalid', function () {
    const spy = spyOn(service, 'getAllCategories').and.returnValue(EMPTY);
    component.ngOnInit();
    let control = component.form.get('name');
    control.setValue('');
    component.submit();

    expect(component.form.invalid).toBeTruthy();
  });

  it('should unsubscribe CategoriesSub in ngOnDestroy', function () {
    component.categoriesSub = EMPTY.subscribe();
    const spy = spyOn(component.categoriesSub, 'unsubscribe');
    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });

  it('should unsubscribe deleteSub in  ngOnDestroy', function () {
    component.deleteSub = EMPTY.subscribe();
    const spy = spyOn(component.deleteSub, 'unsubscribe');
    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });

  it('should unsubscribe editSub in  ngOnDestroy', function () {
    component.editSub = EMPTY.subscribe();
    const spy = spyOn(component.editSub, 'unsubscribe');
    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });
});
