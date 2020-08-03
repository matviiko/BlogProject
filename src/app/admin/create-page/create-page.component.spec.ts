import { CreatePageComponent } from './create-page.component';
import { PostsService } from '../../shared/post.service';
import { AlertService } from '../shared/services/alert.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { EMPTY, of } from 'rxjs';

describe('CreatePageComponent', () => {
  let component: CreatePageComponent;
  let postsService: PostsService;
  let alertService: AlertService;
  let categoriesService: CategoriesService;

  beforeEach(() => {
    postsService = new PostsService(null);
    alertService = new AlertService();
    categoriesService = new CategoriesService(null);
    component = new CreatePageComponent(postsService, alertService, categoriesService);
  });

  it('should call getAllCategories in CategoryService when ngOnInit', () => {
    const spy = spyOn(categoriesService, 'getAllCategories').and.callFake(() => {
      return EMPTY;
    });

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should get categories(length) from backEnd(getAllCategories) after ngOnInit', () => {
    const categories = [
      {
        id: 'one',
        name: 'First category',
        user: 'MKS',
        date: new Date(),
      },
      {
        id: 'two',
        name: 'Second category',
        user: 'MKS',
        date: new Date(),
      },
    ];
    const spy = spyOn(categoriesService, 'getAllCategories').and.callFake(() => {
      return of(categories);
    });

    component.ngOnInit();

    expect(component.categories.length).toBe(2);
  });

  it('should return null if form invalid', function () {
    const spy = spyOn(categoriesService, 'getAllCategories').and.returnValue(EMPTY);
    component.ngOnInit();
    let controlTitle = component.form.get('title');
    controlTitle.setValue('');
    let controlCategories = component.form.get('categories');
    controlCategories.setValue('');
    let controlImg = component.form.get('img');
    controlImg.setValue('');
    let controlAboutPost = component.form.get('aboutPost');
    controlAboutPost.setValue('');
    4;
    let controlText = component.form.get('text');
    controlText.setValue('');

    component.submit();

    expect(component.form.invalid).toBeTruthy();
  });

  it('should create new post', function () {
    let spyGetAll = spyOn(categoriesService, 'getAllCategories').and.returnValue(EMPTY);
    component.ngOnInit();
    let spy = spyOn(postsService, 'create').and.returnValue(EMPTY);

    let controlTitle = component.form.get('title');
    controlTitle.setValue('Title first post');
    let controlCategories = component.form.get('categories');
    controlCategories.setValue('new');
    let controlImg = component.form.get('img');
    controlImg.setValue('http//img');
    let controlAboutPost = component.form.get('aboutPost');
    controlAboutPost.setValue('about post');
    let controlText = component.form.get('text');
    controlText.setValue('text for post');
    component.submit();

    expect(spy).toHaveBeenCalled();
  });

  it('should unsubscribe editSub in  ngOnDestroy', function () {
    component.categoriesSub = EMPTY.subscribe();
    const spy = spyOn(component.categoriesSub, 'unsubscribe');
    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
  });
});
