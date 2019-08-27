import React, { Component } from 'react'
import {
   Carousel,
   CarouselItem,
   CarouselControl,
   CarouselIndicators,
   CarouselCaption
} from 'reactstrap';

const items = [
   {
      src: "https://i.ibb.co/wwFHQyX/c-1.png",
      // altText: 'Slide 1',
      // caption: 'Slide 1'
   },
   {
      src: 'https://i.ibb.co/vPJQMMw/c-2.png',
      // altText: 'Slide 2',
      // caption: 'Slide 2'
   },
   {
      src: 'https://i.ibb.co/HV26tz3/c-3.png',
      // altText: 'Slide 3',
      // caption: 'Slide 3'
   },
   {
      src: 'https://i.ibb.co/vJfHJR1/c-4.png',
      // altText: 'Slide 4',
      // caption: 'Slide 4'
   }
];

class MainCarousel extends Component {

   // Carousel Start
   constructor(props) {
      super(props);
      this.state = { activeIndex: 0 };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.goToIndex = this.goToIndex.bind(this);
      this.onExiting = this.onExiting.bind(this);
      this.onExited = this.onExited.bind(this);
   }

   onExiting() {
      this.animating = true;
   }

   onExited() {
      this.animating = false;
   }

   next() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
   }

   previous() {
      if (this.animating) return;
      const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
   }

   goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({ activeIndex: newIndex });
   }
   // Carousel End

   render() {
      const { activeIndex } = this.state;

      const slides = items.map((item) => {
         return (
            <CarouselItem
               onExiting={this.onExiting}
               onExited={this.onExited}
               key={item.src}>
               <img className="d-block w-100" src={item.src} alt={item.altText} />
               <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
         );
      });

      return (
         <div>
            {/* Carousel Start */}
            <Carousel
               activeIndex={activeIndex}
               next={this.next}
               previous={this.previous}
            >
               <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
               {slides}
               <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
               <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
            {/* Carousel End */}
         </div>
      )
   }
}

export default MainCarousel