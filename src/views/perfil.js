import React, { Component } from 'react'
import { Col, Icon, Radio, Row, Tabs } from 'antd'
const { TabPane } = Tabs
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default class Perfil extends Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={21}>
            <RadioGroup defaultValue="a">
              <RadioButton value="a">Perfil</RadioButton>
              <RadioButton value="b">Dirección</RadioButton>
              <RadioButton value="d">Pedidos</RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane
                tab={
                  <span>
                    <Icon type="user" /> Perfil
                  </span>
                }
                key="1"
              />
              <TabPane
                tab={
                  <span>
                    <Icon type="home" />Dirección
                  </span>
                }
                key="2"
              />
              <TabPane
                tab={
                  <span>
                    <Icon type="exception" />Pedidos
                  </span>
                }
                key="3"
              />
            </Tabs>
          </Col>
        </Row>
      </div>
    )
  }
}
