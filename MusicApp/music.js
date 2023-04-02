class Music{
    constructor(title,singer,img,file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName(){
        return this.title + " - " + this.singer;
    }
}

const musicList =[
    new Music("Buda Geçer mi Sevgilim","Yalın","2.jpeg","2.mp3"),
    new Music("Aramızda Uçurumlar","Suat Suna","3.jpeg","3.mp3"),
    new Music("Antidepresan","Mabel Matiz","4.jpeg","4.mp3"),
    new Music("Helal Olsun","Duman","5.jpeg","5.mp3")
];