export type DataValue = string | number | boolean | null

// @graphql-typegen auto-generated
export type TagState = {
  tag: string
  t?: number
  v?: DataValue
  Metadata?: MetadataItem
  AlarmLegend?: AlarmLegend
  CurrentNotification?: CurrentTagNotification
}

// @graphql-typegen auto-generated
export type AlarmLegend = {
  tag: string
  lowCritical?: number
  lowAlarm?: number
  lowWarning?: number
  highWarning?: number
  highAlarm?: number
  highCritical?: number
}

export type DataType = 'number' | 'string' | 'boolean' | 'group'

// @graphql-typegen auto-generated
export type MetadataItem = {
  tag: string
  name: string
  fullName: Array<string>
  dataType: DataType
  units?: string
  min?: number
  max?: number
  displayPrecision?: number
  rounding?: number
  validTimeout?: number
  userSettable?: boolean
  userSettableMin?: number
  userSettableMax?: number
  EnumType?: EnumType
}

// @graphql-typegen auto-generated
export type CurrentTagNotification = {
  createdAt: Date
  updatedAt: Date
  tag: string
  variant: string
  triggered?: boolean
  severity?: 'INFO' | 'WARNING' | 'ALARM' | 'CRITICAL'
  fields: unknown
}

// @graphql-typegen auto-generated
export type EnumType = {
  Values: EnumValue[]
}

export type EnumValue = {
  value: NonNullable<DataValue>
  displayText?: string
  color: string
}
