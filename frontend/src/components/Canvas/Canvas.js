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
    }

    startDrawing(event) {
        this.isDrawing = true;
        const rect = this.canvasRef.current.getBoundingClientRect();
        this.lastX = event.clientX - rect.left;
        this.lastY = event.clientY - rect.top;
    }

    draw(event) {
        if (!this.isDrawing) return;

        const canvas = this.canvasRef.current;
        const context = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        context.beginPath();
        context.moveTo(this.lastX, this.lastY);
        context.lineTo(x, y);
        context.strokeStyle = "black";
        context.lineWidth = 3;
        context.stroke();

        this.lastX = x;
        this.lastY = y;
    }

    stopDrawing() {
        this.isDrawing = false;
        const signatureDataURL = this.canvasRef.current.toDataURL();
        this.props.onSignatureChange(signatureDataURL);
    }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                width={340}
                height={80}
                style={{
                    border: "1px solid grey",
                    margin: "0 auto",
                }}
            />
        );
    }
}

export default Canvas;
