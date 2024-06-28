<script setup>

import {
  NDynamicInput, NForm, NFormItem, NInput,
  NInputNumber, NModal, NDatePicker, NSelect,
  NButton,
  useNotification, useDialog,
} from "naive-ui";

import {defineProps, defineEmits, watch, ref} from "vue";
import {addResident, deleteResident, updateResident} from "@/assets/js/api/java-api.js";
import {ConvertResidentInformation} from "@/assets/js/utils.js";

const dialog = useDialog()
const notification = useNotification();

const props = defineProps({
  showEditingModal: {
    type: Boolean,
    required: true,
  },
  editingForm: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['close-modal', 'update-resident']);
const localEditingForm = ref(JSON.parse(JSON.stringify(props.editingForm)));

watch(() => props.editingForm, (newVal) => {
  localEditingForm.value = JSON.parse(JSON.stringify(newVal))
})

const tagOptions = [{
  label: '种植户',
  value: '种植户'
}]

const onCreateInParkTime = () => {
  return [void 0, void 0]
}

const onConfirmEditing = () => {
  const form = ConvertResidentInformation.EditFormToAPI(JSON.parse(JSON.stringify(localEditingForm.value)))
  if (form.id) {
    // 就不新增一个字段判断是否编辑了，逻辑判断：如果 ID 不为空，就说明是编辑，否则是新增
    updateResident(
        form.id, form.name, form.identityNumber,
        form.familyNumber, form.inParkTime, form.tags,
        response => {
          if (response.data.success) {
            notification.success({
              content: "编辑居民",
              meta: response.data.message,
              duration: 1000,
              keepAliveOnHover: true
            });
            emit('close-modal')
            emit('update-resident', {
              type: 'edit',
              resident: ConvertResidentInformation.APIToTable(response.data.data),
            })
          } else {
            notification.error({
              content: "编辑居民",
              meta: response.data.message,
              duration: 3000,
              keepAliveOnHover: true
            });
          }
        })
  } else {
    addResident(
        form.name, form.identityNumber,
        form.familyNumber, form.inParkTime, form.tags,
        response => {
          if (response.data.success) {
            notification.success({
              content: "添加居民",
              meta: response.data.message,
              duration: 1000,
              keepAliveOnHover: true
            });
            emit('close-modal')
            emit('update-resident', {
              type: 'add',
              resident: ConvertResidentInformation.APIToTable(response.data.data),
            })
          } else {
            notification.error({
              content: "添加居民",
              meta: response.data.message,
              duration: 3000,
              keepAliveOnHover: true
            });
          }
        }
    )
  }
}
const onCancelEditing = () => {
  emit('close-modal')
}
const onDeleteResident = () => {
  dialog.warning({
    title: '删除居民',
    content: '确定删除该居民吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      deleteResident(localEditingForm.value.id, response => {
        if (response.data.success) {
          notification.success({
            content: "删除居民",
            meta: response.data.message,
            duration: 1000,
            keepAliveOnHover: true
          });
          emit('close-modal')
          emit('update-resident', {
            type: 'delete',
            resident: ConvertResidentInformation.EditFormToTable(JSON.parse(JSON.stringify(localEditingForm.value))),
          })
        } else {
          notification.error({
            content: "删除居民",
            meta: response.data.message,
            duration: 3000,
            keepAliveOnHover: true
          });
        }
      })
    },
    onNegativeClick: () => {
    }
  })
}
</script>

<template>
  <n-modal v-model:show="props.showEditingModal"
           preset="card"
           title="编辑人员信息"
           positive-text="确认"
           negative-text="取消"
           style="width: 70%"
           :bordered="false"
           @close="onCancelEditing">
    <template #footer>
      <div style="display: flex; justify-content: end; gap: 10px; width: 100%">
        <n-button type="error" strong secondary @click="onDeleteResident">删除</n-button>
        <n-button type="info" strong secondary @click="onCancelEditing">取消</n-button>
        <n-button type="primary" strong secondary @click="onConfirmEditing">确认</n-button>
      </div>
    </template>
    <n-form :model="localEditingForm"
            label-placement="left" label-width="auto" require-mark-placement="right-hanging">
      <n-form-item label="身份号">
        <n-input v-model:value="localEditingForm.identityNumber" placeholder="请输入身份号"/>
      </n-form-item>
      <n-form-item label="姓名">
        <n-input v-model:value="localEditingForm.name" placeholder="请输入姓名"/>
      </n-form-item>
      <n-form-item label="家庭号">
        <n-input-number v-model:value="localEditingForm.familyNumber" :min="0" placeholder="请输入家庭号"/>
      </n-form-item>
      <n-form-item label="在园区间">
        <n-dynamic-input v-model:value="localEditingForm.inParkTime" :on-create="onCreateInParkTime">
          <template #create-button-default>
            点击添加在园区间
          </template>
          <template #default="{ value }">
            <div style="display: flex; align-items: center; width: 100%">
              <n-date-picker v-model:value="value[0]" type="date" clearable/>
              <span style="margin: 0 10px">~</span>
              <n-date-picker v-model:value="value[1]" type="date" clearable/>
            </div>
          </template>
        </n-dynamic-input>
      </n-form-item>
      <n-form-item label="标签">
        <n-select v-model:value="localEditingForm.tags" :options="tagOptions" multiple placeholder="请选择标签"
                  clearable/>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<style scoped>

</style>