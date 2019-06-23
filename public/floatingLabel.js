    class FloatingLabel {
      constructor( t ) {
        this.x = 200;
        this.y = 200;
        this.speedX = random( -1, 1 );
        this.speedY = random( -1, 1 );
        this.text = t;
        this.size = 150;
      }

      update() {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
        this.size--;
      }

      draw() {
        textSize( this.size );
        fill( 'white' )
        text( this.text, this.x, this.y );
      }
    }