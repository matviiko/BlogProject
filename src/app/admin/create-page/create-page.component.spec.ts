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
});
