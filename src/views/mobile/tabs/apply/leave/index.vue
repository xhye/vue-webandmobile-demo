<template>
  <div class="leave">
    <!--<van-nav-bar-->
        <!--title="请假"-->
        <!--left-text="返回"-->
        <!--right-text=""-->
        <!--left-arrow-->
        <!--@click-left="$router.go(-1)"-->
    <!--/>-->
    <div class="leave-form">
      <van-cell-group>
        <van-field
            readonly
            clickable
            required
            size="large"
            label="请假类型"
            v-model="type"
            placeholder="请选择"
            @click="showTypePicker = true"
        />
        <van-field
            readonly
            clickable
            required
            size="large"
            label="开始时间"
            v-model="startTime"
            placeholder="请选择"
            @click="showStartTimePicker = true"
        />
        <van-field
            readonly
            clickable
            required
            size="large"
            label="结束时间"
            v-model="endTime"
            placeholder="请选择"
            @click="showEndTimePicker = true"
        />
        <van-field
            style="padding-right: 30%"
            v-model="total"
            center
            clearable
            size="large"
            label="请假时长"
            placeholder="请假时长"
        >
          <span slot="button">小时</span>
        </van-field>
        <van-field
            v-model="reason"
            size="large"
            label="请假事由"
            type="textarea"
            placeholder="请输入详细请假事由"
            rows="1"
            autosize
        />
      </van-cell-group>
    </div>
    <van-popup v-model="showTypePicker" position="bottom">
      <van-picker
          show-toolbar
          :columns="types"
          @cancel="showTypePicker = false"
          @confirm="typeOnConfirm"
      />
    </van-popup>
    <van-popup v-model="showStartTimePicker" position="bottom">
      <van-datetime-picker
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showStartTimePicker = false"
          @confirm="startTimeOnConfirm"
          :formatter="formatter"
      />
    </van-popup>
    <van-popup v-model="showEndTimePicker" position="bottom">
      <van-datetime-picker
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showEndTimePicker = false"
          @confirm="endTimeOnConfirm"
          :formatter="formatter"
      />
    </van-popup>
  </div>
</template>

<script>
import DateFmt from '@/utils/date.js'
export default {
  name: 'leave',
  components: {},
  data() {
    return {
      type: null,
      showTypePicker: false,
      types: ['年假', '事假', '调休假', '病假', '其他'],
      startTime: null,
      endTime: null,
      showStartTimePicker: false,
      showEndTimePicker: false,
      minHour: 9,
      maxHour: 23,
      minDate: new Date(),
      maxDate: new Date(new Date().getFullYear(), 11, 31),
      total: null,
      reason: null
    }
  },
  methods: {
    typeOnConfirm(value) {
      console.log('typeOnConfirm')
      this.type = value;
      this.showTypePicker = false;
    },
    startTimeOnConfirm(value) {
      this.startTime = DateFmt.fmt('yyyy-MM-dd hh:mm',value)
      this.showStartTimePicker = false;
    },
    endTimeOnConfirm(value) {
      this.endTime = DateFmt.fmt('yyyy-MM-dd hh:mm',value)
      this.showEndTimePicker = false;
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      }
      return value;
    }
  }
}
</script>
<style scoped lang="less">
.leave{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-form{
    padding: 5px ;
    flex: 1;
  }
}
</style>
