<template>
  <the-header></the-header>
  <main class="main py-6">
    <div class="container px-4">
      <h1>It's just a PX-VW converter</h1>
    </div>
    <section>
      <div class="container px-4">
        <h2>Pick one of the most common viewports if you want</h2>
        <div class="flex flex-col gap-4 py-4">
          <div>
            <h3>Desktops</h3>
            <div class="grid grid-cols-6 gap-4 mt-2 max-sm:grid-cols-2">
              <button v-for="popularViewport in popularViewports.desktop" :key="popularViewport + 'key'" type="button" @click="changeViewport(popularViewport)">{{popularViewport}}</button>
            </div>
          </div>
          <div>
            <h3>Mobile</h3>
            <div class="grid grid-cols-4 gap-4 mt-2 max-sm:grid-cols-2">
              <button v-for="popularViewport in popularViewports.mobile" :key="popularViewport + 'key'" type="button" @click="changeViewport(popularViewport)">{{popularViewport}}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container px-4">
        <div class="grid lg:grid-cols-2 gap-4 grid-cols-1">
          <div class="flex flex-col gap-2 grow">
            <label for="viewport">Target viewport</label>
            <input type="number" name="viewport" id="viewport" placeholder="1920, 1600, 1440, etc" v-model="viewport">
          </div>
          <div class="flex sm:flex-row flex-col items-center justify-center gap-4">
            <div class="flex flex-col gap-2 grow max-sm:w-full max-sm:relative">
              <label class="max-sm:absolute max-sm:right-4 max-sm:pointer-events-none max-sm:top-1/2 max-sm:-translate-y-1/2" for="px">PX</label>
              <input class="max-sm:w-full max-sm:block max-sm:!pr-12" type="number" name="px" id="px" placeholder="Value in PX" v-model="valuePX" @input="convert($event, valuePX)">
            </div>
            <div class="sm:self-end">
              <svg class="h-8 aspect-square" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M818.752 704H128a32 32 0 1 1 0-64h768a32 32 0 0 1 22.656 54.656l-192 192a32 32 0 0 1-45.312-45.312L818.752 704zM128 448a31.872 31.872 0 0 1-22.656-54.656l192-192a32 32 0 1 1 45.312 45.312L205.248 384H896a32 32 0 1 1 0 64H128z" fill="#5c94cb"/>
              </svg>
            </div>
            <div class="flex flex-col gap-2 grow max-sm:w-full max-sm:relative">
              <label class="max-sm:absolute max-sm:right-4 max-sm:pointer-events-none max-sm:top-1/2 max-sm:-translate-y-1/2" for="vw">VW</label>
              <input class="max-sm:w-full max-sm:block max-sm:!pr-12" type="number" name="vw" id="vw" placeholder="Value in VW" v-model="valueVW" @input="convert($event, valueVW)">
            </div>
          </div>
        </div>
        <section>
          <h2>Object-like PX-VW list generator</h2>
          <div class="grid grid-cols-2 gap-4 mt-4 max-sm:grid-cols-1 sm:grid-rows-2">
            <div class="flex flex-col gap-4 row-span-2">
              <div class="flex flex-col gap-2">
                <label for="prefix">Prefix for your key value, if needed</label>
                <input type="text" id="prefix" v-model="prefix" placeholder="prefix-">
              </div>
              <div class="flex flex-col gap-2">
                <label for="postfix">Postfix for your key value, if needed</label>
                <input type="text" id="postfix" v-model="postfix" placeholder="-postfix">
              </div>
              <div>
                <div class="flex flex-col gap-2">
                  <label for="ranges">Specify ranges or values, if needed</label>
                  <input type="text" id="ranges" v-model="rangesString" @input="validateInput($event)" title="Only numbers, commas, hyphens are allowed. No dots or spaces. Why would you need a FRACTION of a pixel anyway? And spaces are just because it's painful to process your input and check for it EVERYWHERE. I still did it tho." placeholder="1, 2, 4, 8-64, 128">
                </div>
                <div class="mt-2 flex flex-col gap-2">
                  <p>For ranges: <span class="inline text-accent-main bg-accent-alter p-1">100-200</span></p>
                  <p>For specific values: <span class="inline text-accent-main bg-accent-alter p-1">1, 5, 12</span></p>
                  <p>You can also combine values and ranges: <span class="inline text-accent-main bg-accent-alter p-1">1, 5, 100-200, 12</span></p>
                  <p>You can also input a range in reverse: <span class="inline text-accent-main bg-accent-alter p-1">420-359</span></p>
                </div>
              </div>
              <button type="button" @click="rangesString.length > 0 ? processRanges() : therealfun('default')"> Generate me that list</button>
            </div>
            <div class="relative max-sm:h-60 overflow-hidden h-full text-accent-main bg-accent-alter rounded-md row-span-2">
              <pre class="absolute w-full h-full overflow-x-hidden p-4"><code class="w-full h-full overflow-x-hidden" id="JSONContents">{{ keyvalue }}</code></pre>
              <button class="absolute right-8 top-4 bg-background rounded-md w-8 aspect-square block p-1" @click="copyText">
                <svg class="w-full aspect-square" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" class="fill-accent-main"/>
              </svg>
              </button>
              <p v-show="showCopyMessage" class="bg-background rounded-md p-2 absolute left-1/2 -translate-x-1/2 bottom-4" id="message">Copied to clipboard</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
  <the-footer></the-footer>
</template>

<script>
export default {
  data(){
    return {
      popularViewports:{
        'desktop': [1920, 1600, 1536, 1440, 1366, 1280],
        'mobile': [412, 390, 375, 360]
      },
      viewport: 1440,
      valuePX: '',
      valueVW: '',
      // spiceBool: undefined,
      // rangeBool: undefined,
      prefix: '',
      postfix: '',
      rangesString: '',
      keyvalue: {},
      userSpecificSingle: [],
      userSpecificDouble: [],
      showCopyMessage: false,
    }
  },
  methods:{
    helperCompareNumbers(a, b){
      return a - b;
    },
    copyText(){
      if(this.keyvalue.length > 0){
        let that = this;
        navigator.clipboard.writeText(document.getElementById('JSONContents').textContent);
        this.showCopyMessage = !this.showCopyMessage;
        setTimeout(function(){
          that.showCopyMessage = !that.showCopyMessage;
        }, 2000);
      }
    },
    validateInput(event){
      const allowedPattern = /[^0-9*,\-]/g;
      event.target.value = event.target.value.replace(allowedPattern, '');
      this.rangesString = event.target.value.replace(allowedPattern, '');
    },
    processRanges(){
      // alert('PROCESSING')
      const that = this;
      if(this.userSpecificSingle.length > 0){
        this.userSpecificSingle = [];
      }
      if(this.userSpecificDouble.length > 0){
        this.userSpecificDouble = [];
      }
      let userSpecificAll = this.rangesString.split(',');
      userSpecificAll = userSpecificAll.map((element) => element.trim().replace(' ', ''));

      userSpecificAll.filter((single) => {
        if(single.includes('-')){
          let rangeArrayUnfiltered = single.split('-');
          let rangeArrayFiltered = rangeArrayUnfiltered.filter((value) => value.length > 0);
          let rangeArray = rangeArrayFiltered.sort(this.compareNumbers);
          if(rangeArray.length > 1){
            this.userSpecificDouble.push(rangeArray);
          } else{
            this.userSpecificSingle.push(rangeArray[0]);
          }
        } else{
          this.userSpecificSingle.push(single);
        }
      });
      if(this.userSpecificDouble.length > 0){
        this.userSpecificDouble.forEach(function(element, index){
          let first = 0;
          let last = element.length-1;
          if(element[first] && element[last]){
            that.userSpecificDouble[index][first] = element[first];
            that.userSpecificDouble[index][last] = element[last];
          } 
        });
      }
      this.therealfun('ranged');
    },
    therealfun(generationType){
      if(this.rangesString){
        if(Object.keys(this.keyvalue).length > 0){
          this.keyvalue = {};
        }
        switch(generationType){
          case 'ranged':
            const that = this;
            if(this.userSpecificSingle.length > 0){
              this.userSpecificSingle.forEach(function(value){
                that.keyvalue[that.prefix.trim() + value + that.postfix.trim()] = ((value/that.viewport)*100).toFixed(3) + "vw";
              });
            }
            if(this.userSpecificDouble.length > 0){
              // QUIN, you stopped here
              this.userSpecificDouble.forEach(function(element){
                let value_1 = element[0];
                let value_2 = element[-1];
                let pointStart;
                let pointEnd;
                if(value_1 != value_2){
                  pointStart = value_1;
                  pointEnd = value_2;
                  for(let i = pointStart; i <= pointEnd; i++){
                    that.keyvalue[that.prefix.trim() + i + that.postfix.trim()] = ((i/that.viewport)*100).toFixed(3) + "vw";
                  }
                  // let i = pointStart;
                  // while(i <= pointEnd){
                    // that.keyvalue[that.prefix.trim() + i + that.postfix.trim()] = ((i/that.viewport)*100).toFixed(3) + "vw";
                    // i++;
                  // }
                } else if (value_1 == value_2){
                  that.keyvalue[that.prefix.trim() + value_1 + that.postfix.trim()] = ((value_1/that.viewport)*100).toFixed(3) + "vw";
                } else{
                  console.error('Well I don\'t really care what went wrong at this point');
                }
              });
            }
            break;
          default:
            for(let i=0; i < this.viewport+1; i++){
              this.keyvalue[this.prefix.trim() + i + this.postfix.trim()] = ((i/this.viewport)*100).toFixed(3) + "vw";
            }
        }
      } else{
        for(let i=0; i < this.viewport+1; i++){
          this.keyvalue[this.prefix.trim() + i + this.postfix.trim()] = ((i/this.viewport)*100).toFixed(3) + "vw";
        }
      }
    },

    convert(event, value){
      switch(event.target.id){
        case 'px': 
          this.valueVW = ((value/this.viewport)*100).toFixed(3);
          break;
        case 'vw':
          this.valuePX = ((value*this.viewport)/100).toFixed(0);
          break;
        default:
          console.log('Alas, nothing happened');
      }
    },

    changeViewport(value){
      this.viewport = value;
      this.valueVW = ((this.valuePX/this.viewport)*100).toFixed(3);
      this.valuePX = ((this.valueVW*this.viewport)/100).toFixed(0);
    }
  },
  // watch:{
  //   showCopyButton(newValue, oldValue){
  //     return this.keyvalue.length > 0 ? this.showCopyButton = true : this.showCopyButton = false;
  //   }
  // }
}
</script>