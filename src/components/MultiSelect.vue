<script setup>
import { ref, computed } from 'vue'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'

const props = defineProps({
  options: Array,
  modelValue: Array
})

const emit = defineEmits(['update:modelValue'])

const selectedOptions = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function toggleSelection(option) {
  const isSelected = selectedOptions.value.some(o => o.id === option.id)
  if (isSelected) {
    selectedOptions.value = selectedOptions.value.filter(o => o.id !== option.id)
  } else {
    selectedOptions.value = [...selectedOptions.value, option]
  }
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" class="w-full justify-between">
        <span v-if="selectedOptions.length">
          {{ selectedOptions.map(o => `§${o.Paragraph} ${o.Title}`).join(', ') }}
        </span>
        <span v-else>Gesetze auswählen</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-64 p-2 bg-white shadow-md rounded-md border">
      <ScrollArea class="max-h-48 overflow-auto">
        <div v-for="option in options" :key="option.id" class="flex items-center gap-2 py-1">
          <Checkbox :checked="selectedOptions.some(o => o.id === option.id)" @update:checked="toggleSelection(option)" />
          <label class="text-sm cursor-pointer" @click="toggleSelection(option)">
            §{{ option.Paragraph }} {{ option.Title }}
          </label>
        </div>
      </ScrollArea>
    </PopoverContent>
  </Popover>
</template>