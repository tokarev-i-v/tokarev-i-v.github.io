export class CreditsInfoBox {
  constructor() {
    var css = document.createElement("style");
    css.type = "text/css";

    var styles = `
    .credits-info-button {
      position: absolute;
      height: 55px;
      width: 50px;
      color: #ffffff;
      background-color: black;
      font-family: Monospace;
      font-size: 13px;
      text-align: center;
      bottom: 10px;
      left: 10px;
      background-image: url("./skyfox_b_o.jpg");
      background-size: 50px;
      animation: fox_rotate 1s ease-in-out 0.5s alternate
    }
    .credits-info-box{
      height: auto;
      width: 100%;
      padding: 5%;
      position: absolute;
      left: 0px;
      top: 50%;
      background-color: white;
      visibility: hidden;
    }    
    
    @keyframes fox_rotate { 
      from{
        transform: rotateX(0deg);
      }
      to{
        transform: rotateX(360deg);
      }
    }
    `;

    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));
    document.body.appendChild(css);

    this.InfoBoxElement = document.createElement("div");
    this.InfoBoxElement.className = "credits-info-box";
    this.InfoBoxElement.innerHTML = `<a href="https://poly.google.com/view/10u8FYPC5Br">Fox created by Google</a>`;
    document.body.appendChild(this.InfoBoxElement);

    this.InfoBoxButton = document.createElement("button");
    this.InfoBoxButton.className = "credits-info-button";
    this.InfoBoxButton.addEventListener(
      "click",
      this.onInfoBoxButtonClick.bind(this)
    );
    document.body.appendChild(this.InfoBoxButton);
  }
  onInfoBoxButtonClick() {
    if (window.getComputedStyle(this.InfoBoxElement).visibility === "hidden") {
      this.InfoBoxElement.style.visibility = "visible";
    } else {
      this.InfoBoxElement.style.visibility = "hidden";
    }
  }
}
