import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  templateUrl: './dinamic-page.component.html',
  styles: ``
})
export class DinamicPageComponent {

  public myForm: FormGroup = this.formBuilder.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ["Metal Gear", Validators.required],
      ["Death Stranding", Validators.required],
    ])
  });

  public newFavorite: FormControl = new FormControl("",[Validators.required]);

  constructor(private formBuilder: FormBuilder) { }

  onAddToFavorites():void{
    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    // this.favoriteGames.push(new FormControl(newGame, Validators.required));

    this.favoriteGames.push(this.formBuilder.control( newGame, Validators.required ));

    this.newFavorite.reset();

  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls["favoriteGames"] as FormArray ) = this.formBuilder.array([])
    this.myForm.reset();
  }

  get favoriteGames() {
    return this.myForm.get("favoriteGames") as FormArray;
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {

    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case "required":
          return "este campo es requerido";
        case "minlength":
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
      }

    }

    return null;

  }

  isValidFieldInArray(formArray: FormArray, i: number) {
    return formArray.controls[i].errors
      && formArray.controls[i].touched;

  }

}
