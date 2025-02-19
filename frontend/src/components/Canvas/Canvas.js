import React, { createRef, Component } from "react";

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = createRef();
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
    }

    componentDidMount() {
        const canvas = this.canvasRef.current;
        canvas.addEventListener("mousedown", this.startDrawing.bind(this));
        canvas.addEventListener("mousemove", this.draw.bind(this));
        canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
        canvas.addEventListener("mouseleave", this.stopDrawing.bind(this));
        canvas.addEventListener("touchstart", this.startDrawing.bind(this));
        canvas.addEventListener("touchmove", this.draw.bind(this));
        canvas.addEventListener("touchend", this.stopDrawing.bind(this));
        canvas.addEventListener("touchcancel", this.stopDrawing.bind(this));
    }

    startDrawing(event) {
        event.preventDefault();
        this.isDrawing = true;
        const rect = this.canvasRef.current.getBoundingClientRect();
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;
        this.lastX = clientX - rect.left;
        this.lastY = clientY - rect.top;
    }

    draw(event) {
        event.preventDefault();
        if (!this.isDrawing) return;

        const canvas = this.canvasRef.current;
        const context = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        context.beginPath();
        context.moveTo(this.lastX, this.lastY);
        context.lineTo(x, y);
        context.strokeStyle = "black";
        context.lineWidth = 3;
        context.stroke();

        this.lastX = x;
        this.lastY = y;
    }

    stopDrawing(event) {
        event.preventDefault();
        this.isDrawing = false;
        const signatureDataURL = this.canvasRef.current.toDataURL();
        this.props.onSignatureChange(signatureDataURL);
    }

    clearCanvas = () => {
        const canvas = this.canvasRef.current;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.props.onSignatureChange("");
    };

    render() {
        const isDesktop = navigator.userAgentData
            ? !navigator.userAgentData.mobile
            : !/Mobi|Android/i.test(navigator.userAgent);

        return (
            <div>
                <canvas
                    ref={this.canvasRef}
                    width={340}
                    height={100}
                    style={{
                        border: "0.06em solid #cecece",
                        borderRadius: "0.4em",
                        marginRight: isDesktop ? "auto" : "initial",
                    }}
                />
                <button
                    style={{
                        marginLeft: "1em",
                        padding: "0.5em",
                        borderRadius: "0.4em",
                        backgroundColor: "#ebebeb",
                        border: "none",
                        cursor: "pointer",
                    }}
                    onClick={this.clearCanvas}
                >
                    <i className="fa-solid fa-eraser"></i>
                </button>
            </div>
        );
    }
}

export default Canvas;
