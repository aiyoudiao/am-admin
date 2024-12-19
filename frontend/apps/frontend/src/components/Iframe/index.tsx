/*
 * @Description: iframe嵌入
 */

import { FC } from 'react'

type IProps = {
  url: string;
}

const Iframe: FC<IProps> = ({ url }) => {
  return (
    <div style={{ padding: '0 16px' }}>
      <iframe src={url} width="100%" frameBorder='0' height="100%" style={{ height: 'calc(100vh - 150px)' }} />
    </div>
  )
}
export default Iframe