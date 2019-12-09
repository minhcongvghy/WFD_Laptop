import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {TokenStorageService} from '../../auth/token-storage.service';
import {ProductService} from '../../services/product.service';
import {CommentService} from '../../services/comment.service';
import {Product} from '../../model/product';
import {FormControl, FormGroup} from '@angular/forms';
import {Comment} from '../../model/comment';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  private productId: string;
  userId: string;
  product: Product;
  currentRate = 6;
  isShow: boolean;
  topPosToStartShowing = 200;
  formCommentCreate = new FormGroup( {
    contentInput: new FormControl('')
  });
  contentUpdate = new FormControl();
  private listComment: Comment[] = [];
  private idComment: string;
  private tokenJWT: string;

  constructor(private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private token: TokenStorageService,
              private productService: ProductService,
              private sanitizer: DomSanitizer,
              private commentService: CommentService,
              private router: Router) {
    this.activatedRoute.params.subscribe(
      params => {
        this.productId = params.id;
      }
    );

    this.userId = this.token.getUserId();
    this.tokenJWT = this.token.getToken();
  }

  ngOnInit() {

    console.log(this.productId, this.token.getUserId());
    this.getProductById();
    this.getAllCommentThisProduct();
    this.gotoTop();
  }

  goToTop() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  @HostListener('window:scroll')
  checkScroll() {

    // window의 scroll top
    // Both window.pageYOffset and document.documentElement.scrollTop
    // returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;


    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getProductById() {
    this.productService.findProductById(this.productId).subscribe(
      result => {
        this.product = result;
        console.log(this.product);
        console.log('Get product success');
      }, error => {
        console.log('Fail get product');
      }
    );
  }

  getAllCommentThisProduct() {
    this.commentService.getAllCommentByProduct(this.productId).subscribe(
      result => {
        this.listComment = result;
      }, error => {
        console.log(error);
      }
    );
  }

  createComment() {
    const {contentInput} = this.formCommentCreate.value;
    if (contentInput === '' || contentInput === null || contentInput === undefined) {
      return;
    }
    const comment: Comment = {
      idProduct: this.productId,
      content: contentInput,
      user: {
        id: this.token.getUserId()
      }
    };
    this.commentService.createComment(comment).subscribe(
      result => {
        console.log(result , 'ok');
        this.formCommentCreate.reset();
        this.getAllCommentThisProduct();
      }, error => {
        console.log(error);
      }
    );
  }

  closeForm(closeModalRef: HTMLAnchorElement) {
    closeModalRef.click();
    this.getAllCommentThisProduct();
    this.contentUpdate.reset();
  }

  updateComment(commentId: string, closeModalRef: HTMLAnchorElement) {
    if (this.contentUpdate.value === null || this.contentUpdate.value === '' || this.contentUpdate.value === undefined) {
      return this.closeForm(closeModalRef);
    }
    const comment: Comment = {
      id: commentId ,
      content: this.contentUpdate.value
    };
    this.commentService.editComment(comment).subscribe(
      result => {
        this.closeForm(closeModalRef);
      }, error => {
        console.log(error);
      }
    );
    console.log(comment);
  }

  getIdComment(id: string) {
    this.idComment = id;
  }

  deleteComment(closeModalRef2: HTMLButtonElement) {
    this.commentService.deleteComment(this.idComment).subscribe(
      result => {
        this.getAllCommentThisProduct();
        closeModalRef2.click();
      }, error => {
        console.log(error);
      }
    );
  }

}
