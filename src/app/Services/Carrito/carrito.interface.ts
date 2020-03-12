export interface carrito{
    productos: producto[];
}

export interface producto{
    precio: Number;
    cantidad: Number;
    idProducto: string;
    Nombre: string;
    color: string;
    talla:string;
    subtotal: Number;
}
