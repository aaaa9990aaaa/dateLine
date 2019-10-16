<template>
    <div class="date-line">
        <div v-bind:class="{'is-active': item == checkDate}" @click="clickd(item)" v-for="(item,index) in getDateList" :key="index" class="line-box">
            <div class="line-date">
                <div class="after"></div>
                {{item}}
            </div>
            <div class="line-content">
                <span class="line-left"></span>
                <span class="line-rund"></span>
                <span class="line-right"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: undefined
    },
    data() {
        return {
            checkDate: undefined,
            timeList: []
        }
    },
    mounted() {
        if(this.value && this.value != "") {
            this.checkDate = this.value
        }
    },
    computed: {
        getDateList() {
            let nowDate = new Date();
            let timeList = this.timeList
            if(!this.checkDate) {
                for(let i=0; i<7; i++) {
                    let d = this.utils.parseTime( nowDate - ( i*86400000 ),"yyyy-MM-dd")
                    timeList.unshift(d)
                }
                this.checkDate = timeList[6]
            }else {
                //自动排序，直到排好为止
                this.timeAuto()
            }
            return timeList;
        }
    },
    methods: {
        clickd(item){
            this.checkDate=item
            this.$emit("input",this.checkDate)
        },
        //时间轴自动计算函数
        timeAuto() {
            let timeList = this.timeList
            //时间自动往前排
            if(this.checkDate < timeList[3]) {
                timeList.unshift(
                    this.utils.parseTime(new Date(timeList[0].replace(/-/,"/")).getTime() - 86400000, "yyyy-MM-dd")
                )
                timeList.pop()
                this.timeAuto()
            }
            //时间自动往后排
            if(this.checkDate > timeList[3] && timeList[6] < this.utils.parseTime(new Date(),"yyyy-MM-dd")) {
                timeList.push(
                    this.utils.parseTime(new Date(timeList[6].replace(/-/,"/")).getTime() + 86400000, "yyyy-MM-dd")
                )
                timeList.shift()
                this.timeAuto()
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .date-line {
        .line-box {
            width: 9rem;
            text-align: center;
            float: left;
            cursor: pointer;
            color: #fff;
            &:hover {
                .line-date {
                    background-color: #4980ffb4;
                }
                .line-content {
                    .line-rund {
                        background-color: #00FFF6;
                    }
                }
            }

            .line-date {
                display: inline-block;
                margin-bottom: 0.8rem;
                width: 7rem;
                height: 3rem;
                position: relative;
                background-color: #497fff26;
                font-size: 1.05rem;
                line-height: 3rem;
                text-align: center;
                cursor: pointer;
                .after {
                    position: absolute;
                    top: 0px;
                    left: 0px; 
                    width: 100%; 
                    height: 100%; 
                    background: linear-gradient(to left, #00fff77e, #00fff77e) left top no-repeat, 
                                linear-gradient(to bottom, #00fff77e, #00fff77e) left top no-repeat, 
                                linear-gradient(to left, #00fff77e, #00fff77e) right top no-repeat,
                                linear-gradient(to bottom, #00fff77e, #00fff77e) right top no-repeat, 
                                linear-gradient(to left, #00fff77e, #00fff77e) left bottom no-repeat,
                                linear-gradient(to bottom, #00fff77e, #00fff77e) left bottom no-repeat,
                                linear-gradient(to left, #00fff77e, #00fff77e) right bottom no-repeat,
                                linear-gradient(to left, #00fff77e, #00fff77e) right bottom no-repeat;
                    background-size: 1px 0.5rem, 0.5rem 1px, 1px 0.5rem, 0.5rem 1px;  
                }
            }
            .line-content {
                display: inline-block;
                .line-left {
                    float: left;
                    margin-top: 0.45rem;
                    width: 4rem;
                    border-top: 0.1rem solid #497FFF;
                }
                .line-rund {
                    float: left;
                    width: 1rem;
                    height: 1rem;
                    background-color: #497FFF;
                    border-radius: 50%;
                }
                .line-right {
                    @extend .line-left;
                }
            }
        }
        .is-active {
            .line-date {
                background-color: #4980ffb4;
            }
            .line-content {
                .line-rund {
                    background-color: #00FFF6;
                }
            }
        }
    }
</style>