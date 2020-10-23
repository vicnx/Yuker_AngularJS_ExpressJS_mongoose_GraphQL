class homeSliderCtrl {
    
    constructor() {
        console.log("sliderload")
        this.myInterval = 5000;
        this.noWrapSlides = false;
        
        this.slides = [ {image:'/images/slider1.jpg',text:"Get funding for your code projects.",id:0},
                    {image:'/images/slider2.jpg',text:"Supports other projects to keep the community growing.",id:1}];
                    console.log(this.slides);
    }
}

let homeSlider = {
    controller: homeSliderCtrl,
    templateUrl: 'home/homeSlider.html'
};

export default homeSlider;