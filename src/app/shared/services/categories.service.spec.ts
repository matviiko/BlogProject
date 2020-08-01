import { getTestBed, TestBed } from '@angular/core/testing';
import { CategoriesService } from './categories.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('CategoriesService', () => {
  let injector: TestBed;
  let service: CategoriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriesService],
    });
    injector = getTestBed();
    service = injector.get(CategoriesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return an Observable<Category[]>', () => {
    service.getAllCategories().subscribe(categories => {
      expect(categories.length).toBe(5);
    });

    const req = httpMock.expectOne(`${environment.fbDbUrl}/categories.json`);
    expect(req.request.method).toBe('GET');
  });
});
