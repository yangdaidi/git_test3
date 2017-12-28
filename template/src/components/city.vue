<template>
    <div class="ucomp-region">
        <div class="addr-line  u-border-bottom">
            <select id="e_province" class="addr-select" v-model="province" v-on:change="upDateCityDate">
                <option v-for="(item , index) in provinceList" :value="item" v-show="index">{{ item }}</option>
            </select>
            <!-- <span class="addr-up-arrow"></span> -->
            <select id="e_city" class="addr-select" v-model="city" v-on:change="upDateAreaDate">
                <option v-for="item in cityList" :value="item">{{ item }}</option>
            </select>
            <!-- <span class="addr-up-arrow"></span> -->
            <select v-if="areaList.length>0" id="e_area" class="addr-select"  v-model="area">
                <option v-for="item in areaList" :value="item">{{ item }}</option>
            </select>
            <!-- <span v-if="areaList.length>0" class="addr-up-arrow"></span> -->
        </div>   
    </div>
</template>

<script>
/* ----------------------------------------------------------------------------------------------------------
 * @description             省市区(县)三级联动组件
 * @version                 1.0
 * @author                  hzyangyang2015
 * @外部pages调用示例：
 *     1. html模版插入标签：  <city label="address" ref="addr"></city>
 *     
 *     2. import组件：       import city from '@/components/city'
 *                          components: { city }
 *
 *     3. 调用组件对象实例：  let compAddr = this.$refs.addr   该对象可以调用组件内部方法，如compAddr.getAddress();
 * --------------------------------------------------------------------------------------------------------*/
import area from '../libs/area'

export default {
	data(){
        return{
            provinceList:[],
            cityList:[],
            areaList:[],
            province: '省',
            city: '市',
            area: '区',
        }
    },
    mounted(){
        this.provinceList = area.getProvinceList()
        this.cityList = area.getCityList(this.province)
        this.areaList = area.hasArea(this.province)? area.getAreaList(this.province, this.city) : []
    },
    // props: ['alertText'],
    methods: {
        upDateCityDate() {
            this.cityList = area.getCityList(this.province);
            this.city = this.cityList[0]
            this.areaList = area.hasArea(this.province)? area.getAreaList(this.province, this.city) : []
            this.area = area.hasArea(this.province) ? this.areaList[0]:''
        },
        upDateAreaDate() {
            this.areaList = area.hasArea(this.province)? area.getAreaList(this.province, this.city) : []
            this.area = area.hasArea(this.province) ? this.areaList[0]:''
        },
        getAddress() {
            return {
                province: this.province,
                city: this.city,
                area: this.area
            }
        }
    }
}
</script>

<style scoped>
.addr-select{
  width: 1.1rem;
  font-size: 0.14rem;
  line-height: 0.2rem;
  padding: 0;
}
.addr-line{
  position: relative;
  height: 0.5rem;
  line-height: 0.5rem;
  vertical-align: middle;
  margin-left: 0.14rem;
}
.addr-line:after{border-color:#e5e5e5;}
.addr-label{
  font-size: 0.14rem;
  width: 0.7rem;
  line-height: 0.52rem;
  color: #333;
}
.addr-input{
  font-size: 0.14rem;
  line-height: 0.2rem;
  padding: 0;
  color: #333;
}
.addr-input::-webkit-input-placeholder { font-size: 0.12rem; color:#999; }
</style>
