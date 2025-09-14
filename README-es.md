# React Native custom Alert and Prompt

[Documentación en inglés](https://github.com/FerRiv3ra/rn-custom-alert-prompt)

## Instalación

1. Instala la librería

```bash
npm i rn-custom-alert-prompt

```

o

```bash
yarn add rn-custom-alert-prompt
```

## Configuración y personalización

2. Importación y uso del componente AlertContainer

Ahora tenemos que importar el componente AlertContainer. Normalmente esto se hace en los archivos de entrada como ser App.js or App.tsx.

```jsx
import {AlertContainer} from 'rn-custom-alert-prompt';

export const App = () => {
  return (
    <View>
      <AlertContainer />
      {/* Resto del código de tu aplicación */}
    </View>
  );
};
```

### Propiedades

Tu puedes enviar algunas propiedades opcionales para personalizar tus alertas.

| Prop                | Descripción                                                    | Tipo                          | Predeterminado                    |
| ------------------- | -------------------------------------------------------------- | ----------------------------- | --------------------------------- |
| **`animationType`** | Elige la animación con la que aparecerá tu alerta.             | `'none' \| 'fade' \| 'slide'` | _'none'_                          |
| **`appearance`**    | Selecciona la apariencia para tu alerta, entre claro y oscuro. | `'light' \| 'dark'`           | _Apariencia del dipositivo_       |
| **`personalTheme`** | Personaliza completamente cómo aparecerá tu alerta.            | `PersonalTheme`               | _Predeterminado de PersonalTheme_ |
| **`theme`**         | Elija el tema entre iOS y Android para su alerta.              | `'ios' \| 'android'`          | _Detección automática del SO_     |

#### PersonalTheme Props

| Prop                       | Descripción                                           | Tipo         | Predeterminado iOS                    | Preterminado Android                          |
| -------------------------- | ----------------------------------------------------- | ------------ | ------------------------------------- | --------------------------------------------- |
| **`backgroundColor`**      | Color de fondo de la alerta.                          | `rgba color` | _rgba(0,0,0,0.4)_                     | _rgba(0,0,0,0.4)_                             |
| **`backgroundInputColor`** | Color de fondo para la entrada de texto en el prompt. | `string`     | `Light: '#1C1C1E' \| Dark: '#FFFFFF'` | `Light: 'transparent' \| Dark: 'transparent'` |
| **`cardBackgroundColor`**  | Color de la alerta.                                   | `string`     | `Light: '#EEEEEE' \| Dark: '#222222'` | `Light: '#282F2C'\| Dark: '#FFFFFF'`          |
| **`descriptionColor`**     | Color de la descripción de tu alerta.                 | `string`     | `Light: '#000000' \| Dark: '#FFFFFF'` | `Light: '#000000'\| Dark: '#FFFFFF'`          |
| **`inputBorderColor`**     | Color del borde en la entrada de texto del prompt.    | `string`     | `Light: '#C3C3C3' \| Dark: '#616161'` | `Light: '#00D982'\| Dark: '#00D982'`          |
| **`inputColor`**           | Color del texto en el prompt.                         | `string`     | `Light: '#000000' \| Dark: '#FFFFFF'` | `Light: '#000000' \| Dark: '#FFFFFF'`         |
| **`lineColor`**            | Color del separador de botones -iOS únicamente-.      | `string`     | `Light: '#C3C3C3' \| Dark: '#616161'` | `N/A`                                         |
| **`placeholderColor`**     | Color del placeholder en el prompt.                   | `string`     | `Light: '#C3C3C3' \| Dark: '#666666'` | `Light: '#C3C3C3' \| Dark: '#666666'`         |
| **`textButtonColor`**      | Color del texto en los botones.                       | `string`     | `Light: '#4F87FF' \| Dark: '#4F87FF'` | `Light: '#00D982' \| Dark: '#00D982'`         |
| **`titleColor`**           | Color del título de tu alerta.                        | `string`     | `Light: '#000000' \| Dark: '#FFFFFF'` | `Light: '#000000' \| Dark: '#FFFFFF'`         |

## Uso

3. Usar los componentes

### Componente `Alert`

Esta es la típica alerta del sistema con la gran diferencia de que podemos personalizarla y devuelve una promesa con la respuesta del usuario.

#### Uso básico

```jsx
import {Text, TouchableOpacity, View} from  'react-native';
import {Alert} from  'rn-custom-alert-prompt';

const  MyComponent  = () => {

  const handlePress = () => {
    Alert.alert('Title', 'Description')
  }

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>Open Alert</Text>
      </TouchableOpacity>
    </View>
  )
}
```

#### Ejemplos

> iOS

<p float="left">
  <img width="40%"  src="https://res.cloudinary.com/fercloudinary/image/upload/v1710435449/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-14_at_16.54.03_war8fz.png" />
  <img width="40%"  src="https://res.cloudinary.com/fercloudinary/image/upload/v1710435449/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-14_at_16.54.09_holx24.png" />
</p>

> Android

<p float="left">
  <img width="40%"  src="https://res.cloudinary.com/fercloudinary/image/upload/v1710435449/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-14_at_16.53.54_marhwv.png" /> 
  <img width="40%" src="https://res.cloudinary.com/fercloudinary/image/upload/v1710435449/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-14_at_16.53.39_relzf6.png" />
</p>

### Uso con props

```jsx
import {Text, TouchableOpacity, View} from  'react-native';
import {Alert} from  'rn-custom-alert-prompt';

const  MyComponent  = () => {

  const handlePress = async () => {
    const response = await Alert.alert({
      title: 'Alert',
      description: 'Would you like to continue learning how to use React Native alerts?',
      showCancelButton: true,
    })

    console.log(response) // true or false
  }

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>Open Alert</Text>
      </TouchableOpacity>
    </View>
  )
}
```

#### Props de la alerta

| Prop                   | Descripción                            | Tipo                                           | Requerido |
| ---------------------- | -------------------------------------- | ---------------------------------------------- | --------- |
| **`title`**            | Título para tu alerta.                 | `string`                                       | **SI**    |
| **`buttons`**          | Botones personalizados para la alerta. | `Button[]`                                     | _No_      |
| **`cancelColorText`**  | Color de texto del botón cancelar.     | `string`                                       | _No_      |
| **`cancelText`**       | Texto del botón cancelar.              | `string`                                       | _No_      |
| **`confirmColorText`** | Color de texto del botón confirmar.    | `string`                                       | _No_      |
| **`confirmText`**      | Texto del botón confirmar.             | `string`                                       | _No_      |
| **`icon`**             | Ícono de la alerta.                    | `'error' \| 'info' \| 'success' \| 'question'` | _No_      |
| **`iconColor`**        | Color del ícono.                       | `string`                                       | _No_      |
| **`showCancelButton`** | Mostar el botón cancelar.              | `boolean`                                      | _No_      |

#### Props de los botones

| Prop            | Descripción                                       | Tipo                   | Requerido |
| --------------- | ------------------------------------------------- | ---------------------- | --------- |
| **`text`**      | Texto del botón.                                  | `string`               | **SI**    |
| **`textStyle`** | Estilos personalizados para el botón.             | `StyleProp<TextStyle>` | _No_      |
| **`onPress`**   | Función que será ejecutada al presionar el botón. | `function`             | _No_      |

#### Ejemplos

> iOS

<p float="left">
  <img width="40%"  src="https://res.cloudinary.com/fercloudinary/image/upload/v1710435469/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-13_at_19.35.28_ldufyq.png" />
  <img width="40%"  src="https://res.cloudinary.com/fercloudinary/image/upload/v1710435473/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-13_at_19.35.43_q71kqg.png" />
</p>

> Android

<p float="left">
  <img width="40%"  src="https://res.cloudinary.com/fercloudinary/image/upload/v1710435467/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-13_at_19.34.52_infgig.png" /> 
  <img width="40%" src="https://res.cloudinary.com/fercloudinary/image/upload/v1710435468/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-13_at_19.35.12_uldf9z.png" />
</p>

> Con ícono

<p float="left">
  <img width="40%"  src="https://res.cloudinary.com/fercloudinary/image/upload/v1710872843/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-19_at_18.26.06_auvp7s.png" /> 
  <img width="40%" src="https://res.cloudinary.com/fercloudinary/image/upload/v1710872843/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-19_at_18.24.04_l3n8em.png" />
</p>

## Prompt

### Componente `Prompt`

Este es el prompt del sistema que podemos usar en iOS, con la gran diferencia de que podemos personalizarlo y devuelve una promesa con el texto introducido por el usuario.

#### Uso básico

```jsx
import {Text, TouchableOpacity, View} from  'react-native';
import {Alert} from  'rn-custom-alert-prompt';

const  MyComponent  = () => {

  const handlePress = () => {
    const response = await Alert.prompt('Email', 'Please enter your email');

    console.log(response) // string | undefined
  }

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>Open Prompt</Text>
      </TouchableOpacity>
    </View>
  )
}
```

#### Ejemplos

> iOS

<p float="left">
  <img width="40%"  src="https://res.cloudinary.com/fercloudinary/image/upload/v1710438064/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-14_at_17.40.08_ude9cj.png" />
  <img width="40%"  src="https://res.cloudinary.com/fercloudinary/image/upload/v1710438061/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-14_at_17.39.59_iu9c2z.png" />
</p>

> Android

<p float="left">
  <img width="40%"  src="https://res.cloudinary.com/fercloudinary/image/upload/v1710438067/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-14_at_17.40.14_q0h4xf.png" /> 
  <img width="40%" src="https://res.cloudinary.com/fercloudinary/image/upload/v1710438070/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-14_at_17.40.22_khhpvr.png" />
</p>

#### Uso con props

```jsx
import {Text, TouchableOpacity, View} from  'react-native';
import {Alert} from  'rn-custom-alert-prompt';

const  MyComponent  = () => {

  const handlePress = async () => {
    const response = await Alert.prompt({
      title: 'Prompt',
      description: 'Enter your email to continue learning how to use React Native alerts!',
      label: 'Email',
      placeholder: 'example@example.com',
    })

    console.log(response) // string | undefined
  }

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>Open Prompt</Text>
      </TouchableOpacity>
    </View>
  )
}
```

#### Con valor inicial

```jsx
import {Text, TouchableOpacity, View} from  'react-native';
import {Alert} from  'rn-custom-alert-prompt';

const  MyComponent  = () => {

  const handlePress = async () => {
    const response = await Alert.prompt({
      title: 'Prompt',
      description: 'Enter your email to continue learning how to use React Native alerts!',
      label: 'Email',
      defaultValue: 'pre-filled@example.com',
    })

    console.log(response) // string | undefined
  }

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text>Open Prompt</Text>
      </TouchableOpacity>
    </View>
  )
}
```

### Propiedades del prompt

| Prop                   | Descripción                                        | Tipo     | Requerido |
| ---------------------- | -------------------------------------------------- | -------- | --------- |
| **`title`**            | Título para tu alerta.                             | `string` | **SI**    |
| **`cancelColorText`**  | Color de texto del botón cancelar.                 | `string` | _No_      |
| **`cancelText`**       | Texto del botón cancelar.                          | `string` | _No_      |
| **`confirmColorText`** | Color de texto del botón confirmar.                | `string` | _No_      |
| **`confirmText`**      | Texto del botón confirmar.                         | `string` | _No_      |
| **`label`**            | Etiqueta de entrada de texto -Android únicamente-. | `string` | _No_      |
| **`placeholder`**      | Texto del placeholder. **default:** _title value_  | `string` | _No_      |
| **`defaultValue`**     | Valor inicial del campo de entrada                 | `string` | _No_      |

#### Ejemplos

> iOS

<p float="left">
  <img width="40%"  src="https://res.cloudinary.com/fercloudinary/image/upload/v1710435470/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-13_at_19.35.35_tgfexi.png" />
  <img width="40%"  src="https://res.cloudinary.com/fercloudinary/image/upload/v1710435473/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-13_at_19.35.45_tjsxhh.png" />
</p>

> Android

<p float="left">
  <img width="40%"  src="https://res.cloudinary.com/fercloudinary/image/upload/v1710435468/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-13_at_19.34.56_qxssok.png" /> 
  <img width="40%" src="https://res.cloudinary.com/fercloudinary/image/upload/v1710435468/GitHub/Simulator_Screen_Shot_-_iPhone_13_-_2024-03-13_at_19.35.15_hs7gk3.png" />
</p>

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](http://opensource.org/licenses/mit-license.html).
