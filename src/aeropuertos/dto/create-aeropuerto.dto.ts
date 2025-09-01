export class CreateAeropuertoDto {
    nombre: string;
    codigo: string;
    ciudad: string;

    constructor(nombre: string, codigo: string, ciudad: string){
        this.nombre = nombre;
        this.codigo = codigo;
        this.ciudad = ciudad;
    };
}
