import Skeleton from './Skeleton'
import Slider from './Slider'
import More from './More'
import Bread from './Bread'
import BreadItem from './Bread/Item'
import InfiniteLoad from './InfiniteLoad'
import City from './City'
import Button from './Button'
import CheckBox from './CheckBox'
import Dialog from './Dialog'
import Sku from './Sku'
import ImageView from './ImageView'
import XtxNumber from './NumberBox'
import StepItem from './StepItme'

export default {
  install (app) {
    app.component(Skeleton.name, Skeleton)
    app.component(Slider.name, Slider)
    app.component(More.name, More)
    app.component(Bread.name, Bread)
    app.component(BreadItem.name, BreadItem)
    app.component(InfiniteLoad.name, InfiniteLoad)
    app.component(City.name, City)
    app.component(Button.name, Button)
    app.component(CheckBox.name, CheckBox)
    app.component(Dialog.name, Dialog)
    app.component(Sku.name, Sku)
    app.component(ImageView.name, ImageView)
    app.component(XtxNumber.name, XtxNumber)
    app.component(StepItem.name, StepItem)
  }
}
