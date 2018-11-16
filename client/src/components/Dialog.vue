<template>
<div class="dialog">
        <el-dialog :title="dailog.title" :visible.sync="dailog.show" >
        <el-form :model="form" ref="form"  :rules="rules">

            <el-form-item label="收支类型:" :label-width="formLabelWidth">
            <el-select v-model="form.type" placeholder="请选择收支类型" >
                <el-option v-for='(item,index) in format_type_list' :key="index" :label="item" :value="item"></el-option>
            </el-select>
            </el-form-item>

             <el-form-item prop='describe' label="收支描述:" :label-width='formLabelWidth'>
                <el-input type="describe" v-model="form.describe"></el-input>
            </el-form-item>
            
            <el-form-item prop='income'  label="收入:" :label-width='formLabelWidth'>
                <el-input type="income" v-model="form.income"></el-input>
            </el-form-item>

            <el-form-item prop='expend' label="支出:" :label-width='formLabelWidth'>
                <el-input type="expend" v-model="form.expend"></el-input>
            </el-form-item>

            <el-form-item prop='cash' label="账户现金:" :label-width='formLabelWidth'>
                <el-input type="cash" v-model="form.balance"></el-input>
            </el-form-item>

            <el-form-item label="备注:" :label-width='formLabelWidth'>
                <el-input type="textarea" v-model="form.remarks"></el-input>
            </el-form-item>
            <el-form-item  class="text_right" >
                <el-button @click="dailog.show = false">取 消</el-button>
                <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
            </el-form-item>
        </el-form>
      
    </el-dialog>
</div>
</template>
<script>
export default {
  name: "dialog",
  props: {
    dailog: {
      type: Object
    },
    form: {
      type: Object
    }
  },
  data() {
    return {
      formLabelWidth: "120px",
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],

      rules: {
        describe: [
          { required: true, message: "describe不能为空", trigger: "blur" }
        ],
        income: [
          { required: true, message: "income不能为空", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "expend不能为空", trigger: "blur" }
        ],
        balance: [
          { required: true, message: "balance不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit(data) {
      this.$refs[data].validate(valid => {
        if (valid) {
            const url = this.dailog.option == 'add' ? 'add' : `edit/${this.form._id}`;
          this.axios.post(`/api/profile/${url}`, this.form).then(res => {
              const data = this.dailog.option == 'add' ? '添加' : `编辑`;
            this.$message({
              message: `${data}添加成功`,
              type: "success"
            });
            //隐藏弹窗
            this.dailog.show = false;
            //更新数据
            this.$emit("update");
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.text_right {
  width: 200px;
  height: 40px;
  text-align: center;
  margin-left: 40%;
}
</style>


