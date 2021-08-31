import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {

  @ViewChild('fakerForm', { static: false }) fakerFormRef: ElementRef;

  formGroup = new FormGroup({
    shopName: new FormControl(""),
    removeShop: new FormControl(""),
  });
  /**候選店家 */
  shops = [
    "黃巾大餛飩",
    "東門鴨莊",
    "喫飯食堂",
    "梁鑫雞肉飯",
    "瓦城",
    "開飯川食堂",
  ];
  defaultRemoveShop = this.shops[0];

  /**要吃的店家 */
  result = "";
  /**當前店家在陣列中的index */
  index = 0;
  timer;

  ngOnInit() {
    this.ButtonStart();
  }

  /**隨機選店家 */
  ButtonStart() {
    //Math.random() 取 0~1之間的亂數
    //Math.floor() 取最大整數
    //決定從哪個地方開始跑
    this.index = Math.floor(Math.random() * this.shops.length);
    clearInterval(this.timer);

    this.timer = setInterval(() => {
      this.result = this.shops[this.index];
      this.index++;
      //如果超過陣列範圍，則歸零
      if (this.index > this.shops.length - 1) {
        this.index = 0;
      }
    }, 50);
  }

  /**選取店家 */
  ButtonChoose() {
    clearInterval(this.timer);
  }

  /**加入店家 */
  ButtonAdd() {
    /**加入店家名稱 */
    const shopName = this.formGroup.get("shopName").value;
    if (this.shops.some((x) => x === shopName) === true) {
      alert(shopName + "已存在");
    } else {
      this.shops.push(shopName);
      this.formGroup.get("shopName").setValue('');
      this.setFocus('shopName')
    }
    this.ButtonStart();
  }

  change_removeShop(e) {
    console.log(e.target.value);
  }

  /**刪除店家 */
  ButtonDelete() {
    let removeShopName =
      this.formGroup.get("removeShop").value;
    const existIndex = this.shops.indexOf(removeShopName);
    if (removeShopName !== "" && removeShopName !== undefined) {
      if (existIndex > -1) {
        this.shops.splice(existIndex, 1);
        this.defaultRemoveShop = this.shops[0];
      }
      this.ButtonStart();
    } else {
      alert("已無任何候選店家,請加入新店家");
      this.setFocus('shopName')
    }
  }

  /**刪除全部店家 */
  ButtonAllDelete() {
    if (this.shops.length === 0) {
      alert("已無任何候選店家,請加入新店家");
      this.setFocus('shopName')
    } else {
      clearInterval(this.timer);
      this.shops = [];
      this.result = " ";
    }
  }

  setFocus(focusId: string) {
    const focusElement = this.fakerFormRef.nativeElement[focusId];
    if (focusElement) {
      focusElement.focus();
    }
  }
}
