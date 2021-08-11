// export interface Product{
//     ma: string;
//     TenBanh: string;
//     LoaiBanh: string;
//     NgaySX: string;
//     HSD: string;
//     completed: boolean,
//     SL: Number,
//     NCC: string,
//     Anh: string,
//     MoTa: string,
//     Gia: string,
//     GiamGia: Number,
// }
export class Product{
    MaBanh: Number = 0;
    TenBanh: string = '';
    SL: Number = 0;
    TenLoaiBanh: string = '';
    AnhSP: string = '';
    HinhDang: string = '';
    MoTa: string = '';
    MaLoaiBanh: Number = 0;
    SLBan: Number = 0;
    SLTon: Number = 0;
    TrangThaiLoaiBanh: boolean = true;
    completed: boolean = false;
}