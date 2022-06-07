import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces/paises.interface';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html',
  styleUrls: ['./selector-pages.component.css'],
})
export class SelectorPagesComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region  : [, [Validators.required]],
    pais    : [, [Validators.required]],
    frontera: [, [Validators.required]],
  });

  //Llenar Selectores

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  //fronteras: string[] = [];
  fronteras: PaisSmall[] = [];

  //UI

  cargando: boolean = false

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    //Cuando cambie la region
    /*  this.miFormulario.get('region')?.valueChanges
    .subscribe(region =>{
      console.log(region);
      this.paisesService.getpaisesPorRegion( region )
      .subscribe(paises =>{
        console.log(paises);
        this.paises = paises;
      })
    }) */
    //Cuando cambie la region
    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.miFormulario.get('pais')?.reset('');
          //this.miFormulario.get('frontera')?.disable();
          this.cargando = true;
        }),
        switchMap((region) => this.paisesService.getpaisesPorRegion(region))
      )
      .subscribe((paises) => {
        let aux = this.miFormulario.controls['pais'].value;

        //console.log(JSON.stringify(paises), 'paises');
        let aux2 = JSON.stringify(paises);
        let aux3 = JSON.parse(aux2);
        this.paises = aux3;
        this.cargando = false
      });

      //Cuando cambie el pais
    this.miFormulario
    .get('pais')
    ?.valueChanges.pipe(
      tap(( _ ) => {
        this.fronteras = [];
        this.miFormulario.get('frontera')?.reset('');
        //this.miFormulario.get('frontera')?.enable();
        this.cargando = true;
      }),
      switchMap((codigo) => this.paisesService.getPaisByCode(codigo)),
      //switchMap((pais: any) => this.paisesService.getPaisesByCodigos(pais?.boders!)) 
    )
    .subscribe((pais: any) => {
    if(pais){
      this.fronteras =pais[0].borders || []; //si el pais no viene entonces regresa un array vacio
    }
    this.cargando = false
    });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }

  onChangeRegion(valueContinente: any) {
    console.log(valueContinente.value);

    
  }

  onChangePaises(valuePais: any) {
    
  }
}
