<template>
    <div class="container">
        <div :model='search_data'>
             <span class="filter_span">按照时间进行筛选:</span>
         <el-date-picker
            v-model="search_data.startTime"
            type="date"
            placeholder="开始时间">
          </el-date-picker>
          --
          <el-date-picker
            v-model="search_data.endTime"
            type="date"
            placeholder="结束时间">
          </el-date-picker>
          <el-button type="primary" class="filter" size='small' @click="handleFilter"> 筛选</el-button>
            <div class="btn_container">
              <el-button class="btn_container" v-if="user.identity == 'admin'" type="primary"  size='small' @click="handleAdd">添加数据</el-button>
           </div>
        </div>
 
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
          type="index"
          label="序号"
          align='center'
          width="70">
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间"
        align='center'
        width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="收支类型"
          align='center'
        width="150">
      </el-table-column>
      <el-table-column
        prop="describe"
        label="收支描述"
          align='center'
        width="180">
      </el-table-column>
      <el-table-column
        prop="income"
        label="收入"
        align='center'
        width="170">
        <template slot-scope="scope">
          <span style='color:red'>{{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="expend"
        label="支出"
        align='center'
        width="170">
      <template slot-scope="scope">
          <span style='color:orange'>{{ scope.row.expend }}</span>
        </template>
      </el-table-column>
          <el-table-column
        prop="balance"
        label="账户现金"
        align='center'
        width="170">
      <template slot-scope="scope">
          <span style='color:pink'>{{ scope.row.balance }}</span>
        </template>
      </el-table-column>
          <el-table-column
        prop="remarks"
        align='center'
        label="备注"
        width="220">
      </el-table-column>
      <el-table-column
        label="操作"
        align='center'
        width="220">
        <template slot-scope="scope">
          <el-button  v-if="user.identity == 'admin'" @click="handleEdit(scope.row)"  type="warning" size="small">编辑</el-button>
          <el-button  v-if="user.identity == 'admin'" size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Dialog :dailog='dailog' :form='form' @update='getProfile'></Dialog>
      <div class="pagination">
           <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total">
            </el-pagination>
      </div>
    </div>

</template>
<script>
import Dialog from "../components/Dialog";
export default {
  name: "manage",
  data() {
    return {
      search_data : {
        startTime : '',
        endTime : ''
      },
      filterData:[],
      tableData: [],
      allTableData: [],
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      dailog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        balance: "",
        remarks: "",
        _id: ""
      }
    };
  },
  computed : {
    user(){
      return this.$store.getters.user;
    }
  },
  methods: {
    getProfile() {
      this.axios
        .get("/api/profile")
        .then(res => {
          this.allTableData = res.data;
          this.filterData = res.data;
          this.setPaginations();
        })
        .catch(err => console.log(err));
    },
    setPaginations() {
      //设置展示的
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      //展示
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleEdit(row) {
      this.dailog = {
        show: true,
        title: "编辑信息",
        option: "edit"
      };
      this.form = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        balance: row.balance,
        remarks: row.remarks,
        _id: row._id
      };
    },
    handleDelete(row) {
      this.axios.delete(`/api/profile/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    handleAdd() {
      this.dailog = {
        show: true,
        title: "添加信息",
        option: "add"
      };
      this.form = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        balance: "",
        remarks: "",
        _id: ""
      };
    },
    handleSizeChange(page_size) {
      //切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      //展示
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      let index = this.paginations.page_size * (page - 1);

      let num = this.paginations.page_size * page;

      let table = [];
      for (var i = index; i < num; i++) {
        if (this.allTableData[i]) {
          table.push(this.allTableData[i]);
        }
        this.tableData = table;
      }
    },
    handleFilter(){
      //筛选
      if(!this.search_data.startTime || !this.search_data.endTime){
        this.$message({
          type : 'warning',
          message : '请选择日期'
        })
        this.getProfile();
      }
      //获取开始结束时间
      let sTime = this.search_data.startTime.getTime();
      let eTime = this.search_data.endTime.getTime();
      
      //过滤      
      this.allTableData = this.filterData.filter(item => {
        let date = new Date(item.date).getTime();
          return date >= sTime && date <= eTime;
      })
      //分页
      this.setPaginations();
    }
  },
  created() {
    this.getProfile();
  },
  components: {
    Dialog
  }
};
</script>
<style scoped>
.container {
  padding: 10px;
  margin-left: 200px;
}
.btn_container {
  margin-bottom: 10px;
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
.filter_span{
  display: inline-block;
  font-size: 14px;
  padding-right: 5px;
}
.filter{
  margin-left: 10px;
}
</style>
