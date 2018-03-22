<template>
    <div id="com1">
    	<router-link
            :to="{name:'com2'}">com2
        </router-link><br>
		<router-link
            :to="{name:'pwdLogin'}">login
        </router-link>
    </div>
</template>
<script>
import {testAPI} from '../service/api'
import falseHints from '@/mixins/falseHints'
export default {
	mixins: [falseHints],
	data () {
		return {
			detailData: {}
		}
	},
	components: {},
	computed: {},
	beforeRouteEnter (to, from, next) {
		next(vm => {
	        vm.initData()
	    })
	},
	mounted () {},
	watch: {},
	methods: {
		async initData () {
			try {
				let res = await testAPI('1,2,3,4;2,3,4;2,3')
				let con = res.data
				if (data.code = 200) {
					//
				} else {
					throw new Error('数据有误')
				}
			} catch (error) {
				this.falseHints(error)
				// if(error.message){
				// 	this.$store.dispatch('set_tooltip', {
			 //            isShow: true,
			 //            msg: error.message
			 //        })
		  //       }
			}
		}
	}
}
</script>
<style lang="scss">
$daye: #000;
#com1{
	background-color: $daye;
}
</style>
