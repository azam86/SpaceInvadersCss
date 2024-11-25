class Star {
    constructor(x,y, size) {
        this.id = document.createElement("div");
        this.id.setAttribute("class","starclass");
        document.getElementById("fundo").appendChild(this.id);
        this.size = size;
        this.x = x;
        this.y = y;
    }

    render() {
        this.id.style.left = this.x + "px";
        this.id.style.top  = this.y + "px";
        this.id.style.width  = this.size + "px";
        this.id.style.height = this.size + "px";
    }
}