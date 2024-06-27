<script setup>

import {
  NDynamicInput, NForm, NFormItem, NInput,
  NInputNumber, NModal, NDatePicker, NSelect,
} from "naive-ui";

import {defineProps, defineEmits, watch, ref} from "vue";
import {format} from "date-fns/esm";
import {addResident, updateResident} from "@/assets/js/api/java-api.js";

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
const emit = defineEmits(['close-modal']);
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
  const form = JSON.parse(JSON.stringify(localEditingForm.value))
  form.inParkTime = form.inParkTime.map(([start, end]) => {
    return [format(new Date(start), 'yyyy-MM-dd'), format(new Date(end), 'yyyy-MM-dd')]
  })
  if (form.id) {
    // 如果 ID 不为空，就说明是编辑，否则是新增
    updateResident(
        form.id, form.name, form.identityNumber,
        form.familyNumber, JSON.stringify(form.inParkTime), form.tags.join(','),
        response => {
          console.log(response)
        })
  } else {
    addResident(
        form.name, form.identityNumber,
        form.familyNumber, JSON.stringify(form.inParkTime), form.tags.join(','),
        response => {
          console.log(response)
        }
    )
  }
  emit('close-modal', form)
}
const onCancelEditing = () => {
  emit('close-modal')
}
</script>

<template>
  <n-modal v-model:show="props.showEditingModal"
           preset="dialog"
           title="编辑人员信息"
           positive-text="确认"
           negative-text="取消"
           style="width: 70%"
           @close="onCancelEditing"
           @positive-click="onConfirmEditing"
           @negative-click="onCancelEditing">
    <n-form :model="localEditingForm"
            label-placement="left" label-width="auto" require-mark-placement="right-hanging">
      <n-form-item label="身份号">
        <n-input v-model:value="localEditingForm.identityNumber" placeholder="请输入身份号"/>
      </n-form-item>
      <n-form-item label="姓名">
        <n-input v-model:value="localEditingForm.name" placeholder="请输入姓名"/>
      </n-form-item>
      <n-form-item label="家庭号">
        <n-input-number v-model:value="localEditingForm.familyNumber"
                        :min="0"
                        placeholder="请输入家庭号"/>
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