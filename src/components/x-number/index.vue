<template>
  <div>
    <div class="cyui-number">
      <span class="cyui-number-selector cyui-number-selector-sub"
            @click="sub"
            :class="{'cyui-number-disabled':disabledMin}">
        <i class="cyui-iconfont icon-jian"></i>
      </span>
      <input v-model.number="currentValue" :name="name" class="cyui-number-input" :style="{width: width}"
             :readonly="!fillable" pattern="[0-9]*" type="number" @blur="blur"/>
      <span class="cyui-number-selector cyui-number-selector-plus"
            @click="add"
            :class="{'cyui-number-disabled':disabledMax}">
        <i class="cyui-iconfont icon-jia"></i>
      </span>
    </div>
  </div>
</template>
<script>
  const Big = require('big.js')
  export default {
    name: 'number',
    props: {
      min: Number,
      max: Number,
      step: {
        type: Number,
        default: 1
      },
      value: {
        validator (value) {
          if (typeof value === 'number') {
            return true
          } else if (typeof value === 'string') {
            return value === ''
          }
          return false
        },
        default: 0
      },
      name: String,
      fillable: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '50px'
      }
    },
    created () {
      this.currentValue = this.value
    },
    data () {
      return {
        currentValue: 0
      }
    },
    computed: {
      disabledMin () {
        return typeof this.min === 'undefined' ? false : (this.currentValue === '' ? true : this.currentValue <= this.min)
      },
      disabledMax () {
        return typeof this.max === 'undefined' ? false : (this.currentValue === '' ? true : this.currentValue >= this.max)
      }
    },
    watch: {
      currentValue (newValue, old) {
        if (newValue !== '') {
          if (typeof this.min !== 'undefined' && this.currentValue < this.min) {
            this.currentValue = this.min
          }
          if (this.max && this.currentValue > this.max) {
            this.currentValue = this.max
          }
        }
        this.$emit('input', this.currentValue)
        this.$emit('on-change', this.currentValue)
      },
      value (newValue) {
        this.currentValue = newValue
      }
    },
    methods: {
      add () {
        if (!this.disabledMax) {
          const x = new Big(this.currentValue)
          this.currentValue = x.plus(this.step) * 1
        }
      },
      sub () {
        if (!this.disabledMin) {
          const x = new Big(this.currentValue)
          this.currentValue = x.minus(this.step) * 1
        }
      },
      blur () {
        if (this.currentValue === '') {
          this.currentValue = 0
        }
      }
    }
  }
</script>
<style lang="less"></style>
