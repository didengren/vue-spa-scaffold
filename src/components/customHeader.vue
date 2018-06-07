<template>
    <div class="custom-header">
        <x-header>
            <span>{{title}}<b v-if="Number(titleCount) > 0">({{titleCount}})</b></span>
            <p slot="overwrite-left" class="go-back" @click.prevent="goBack">
                <i v-if="leftWords!=='退出'" class="dealer-icon icon-fanhui"></i>
                <b>{{leftWords}}</b>
            </p>
            <p slot="right" v-if="rightLinkIcon.length > 0">
                <router-link
                    class="a-link"
                    v-for="(item, i) in rightLinkIcon"
                    :key="i"
                    :to="{name: item.routerName, query: item.routerParam}">
                    <i v-if="item.iconName !== '实时监控'" :class="'dealer-icon icon-' + item.iconName"></i>
                    <span v-else style="line-height:0.92rem;color:#fff;font-size:0.3rem;">实时监控</span>
                    <badge v-if="item.routerParam.new" class="dot"></badge>
                </router-link>
            </p>
            <p slot="right" v-if="rightSwitch" class="custom-right">
                预警通知
                <toggle-button 
                    :value="msgPush" 
                    :color="{checked: '#ffffff', unchecked: '#4A4A4A'}" 
                    :sync="true"
                    :width="tbW"
                    :height="tbH"
                    :labels="{checked: '开', unchecked: '关'}"
                    @change="onChange"/>
            </p>
            <p slot="right" v-if="rightEventIcon.length > 0">
                <i 
                    style="padding: 0 0.2rem;"
                    v-for="(item, i) in rightEventIcon"
                    :class="'dealer-icon icon-' + item" 
                    @click="onClick(i)"></i>
            </p>
        </x-header>
    </div>
</template>

<script>
/* eslint-disable */
import {XHeader, Badge} from 'vux'
import {backPX} from '@/tools/utils'
import native from '@/tools/native-api.min.js'
import {mapState} from 'vuex'
import {warnSwitchAPI} from '@/service/api'
let tbW = backPX(0.88)
let tbH = backPX(0.4)
export default {
    name: 'custom-header',
    beforeRouteEnter (to, from, next) {
        next()
    },
    mixins: [],
    components: {XHeader, Badge},
    data () {
        return {
            tbW: tbW,
            tbH: tbH
        }
    },
    props: {
        leftWords: {
            type: String,
            default: '返回'
        },
        title: {
            type: String,
            default: ''
        },
        titleCount: {
            type: [Number, String],
            default: 0
        },
        rightLinkIcon: {
            type: Array,
            default: function () {
                return []
            }
        },
        rightSwitch: {
            type: Boolean,
            default: false
        },
        // iconDot: {
        //     type: Boolean,
        //     default: false
        // },
        rightEventIcon: {
            type: Array,
            default: function () {
                return []
            }
        },
        customBack: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        goBack: function () {
            if (this.customBack) {
                this.$emit('custom-back')
                return
            }
            if (this.$router.currentRoute.query && this.$router.currentRoute.query.msgPush || window.history.length <= 1) {
                native.exit()
                return
            }
			this.$router.go(-1)
        },
        async onChange () {
            let param
            if (!this.msgPush) {
                param = 1
            } else {
                param = 0
            }
            let response = await warnSwitchAPI(param)
            let result = response.data
            if (result.bizcode === 10000) {
                if (param === 1) {
                    this.$store.dispatch('set_tooltip', {
                        isShow: true,
                        msg: '已打开通知'
                    })
                } else if (param === 0) {
                    this.$store.dispatch('set_tooltip', {
                        isShow: true,
                        msg: '已关闭通知'
                    })
                }
                this.$store.dispatch('set_msg_push', !this.msgPush)
            } else {
                this.$store.dispatch('set_tooltip', {
                    isShow: true,
                    msg: '操作失败'
                })
                this.$store.dispatch('set_msg_push', this.msgPush)
                return
            }
        },
        onClick (i) {
            this.$emit('hd-right-click', i)
        }
    },
    computed: {
        ...mapState({
            'msgPush': state => state.base.msgPush
        })
    },
    created () {},
    mounted () {
        if (this.rightSwitch) {
            Object.keys(this.$parent.$refs).map((item) => {
                this.$parent.$refs[item].reset = () => {
                    this.$store.dispatch('set_msg_push', !this.msgPush)
                }
            })
        }
    },
    beforeRouteUpdate (to, from, next) {
        next()
    }
}
</script>

<style lang="less">
@import "../assets/styles/base/_variables";
@import "../assets/styles/base/icon";

.custom-header{
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    right: 0;
    z-index: 100;
    // background:-webkit-gradient(linear, 0 0, right 0, from(@bg-gradual-change-down), to(@bg-gradual-change-up)) fixed;
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(@bg-gradual-change-up), to(#2cc39d)) fixed;
    .vux-header{
        background: none;
        height: 0.92rem;
        padding: 0;
        .vux-header-title{
            height: 0.92rem;
            margin: 0 1.2rem;
            & > span{
                font-size: 0.32rem;
                line-height: 0.92rem;
            }
        }
        .vux-header-left{
            height: 0.92rem;
            line-height: 0.92rem;
            top: 0;
            left: 0.2rem;
            overflow: hidden;
            .go-back{
                font-size: 0;
                padding-right: 0.2rem;
                .dealer-icon{
                    font-size: 0.28rem;
                    color: #fff;
                }
                b{
                    color: #fff;
                    font-size: 0.3rem;
                }
            }
        }
        .vux-header-right{
            top: 0;
            right: 0.2rem;
            p > a{
                margin-left: 0;
                padding: 0 0.2rem;
                // &:first-child{
                //     margin-left: 0.12rem;
                // }
            }
            .dealer-icon{
                font-size: 0.4rem;
                color: #fff;
                line-height: 0.92rem;
            }
            .custom-right{
                vertical-align: middle;
                font-size: 0.26rem;
                color: #fff;
                line-height: 0.92rem;
            }
            .a-link{
                position: relative;
                .dot{
                    position: absolute;
                    top: 0.24rem;
                    right: 0.1rem;
                }
            }
        }
    }
    .vue-js-switch{
        margin-left: 0.1rem;
        .v-switch-label{
            font-size: 0.2rem;
            color: #1EC496;
        }
        .v-switch-core .v-switch-button{
            background-color: #1EC496;
        }
    }
}
</style>
