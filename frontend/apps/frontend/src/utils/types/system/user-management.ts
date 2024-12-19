import { FormInstance } from '@ant-design/pro-components';
import { MutableRefObject } from 'react';

import type { PaginationParams, SearchTimes } from '@/utils/types';

/**
 * @description: FormTemplate Props
 */
export type FormTemplateProps = {
  reloadTable: () => void;
  setModalVisibleFalse: () => void;
  modalVisible: boolean;
  stepFormMapRef: MutableRefObject<MutableRefObject<FormInstance<any> | undefined>[]>;
};

/**
 * @description: UserInformation Props
 */
export type UserInformationProps = {
  showLabel?: boolean;
  disabledField?: boolean;
};

/**
 * @description: 头部搜索表单 Params
 */
export type SearchParams = PaginationParams &
  SearchTimes &
  Partial<Pick<API.USERMANAGEMENT, 'user_name' | 'sex' | 'status'>>;

/**
 * @description: 设置用户状态 Props
 */
export type UserStatusProps = Pick<API.USERMANAGEMENT, 'user_id' | 'status'>;
