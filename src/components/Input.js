import React from "react";
import styled from "styled-components/native";
import { useWindowDimensions } from "react-native";
import PropsTypes from "prop-types";

/*
 * 리엑트 네이티브에서는 크기가 다양한 모바일 기기에 대응하기 위해 현재 화면의 크기를 알 수 있는 Dimensions와 useWindowDimensions를 제공한다.
 * 두 기능 모두 현재 기기의 화면 크기를 알 수 있고, 이를 이용해 다양한 크기의 기기에 동일한 모습으로 적용될 수 있도록 코드를 작성할 수 있다.
 *
 * Dimensions는 처음 값을 받아왔을 때의 크기로 고정되기 때문에 기기를 회전해서 화면이 전환되면 변화된 화면의 크기와 일치하지 않을 수 있다.
 * 이런 상황을 위해 이벤트리스너를 등록하여 화면의 키기 변화에 대응 할 수 있도록 기능을 제공하고 있다.
 *
 * useWindowDimensions는 리엑트 네이티브에서 제공하는 Hooks 중 하나로, 화면의 크기가 변경되면 화면의 크기, 너비, 높이를 자동으로 업데이트한다.
 */

/*
 * TextInput 속성
 * - autoCapitalize : 자동으로 대문자 전환
 * - autoCorrect : 자동 수정 기능
 * - returnKeyType : 키보드의 완료 버튼 설정
 * - keyboardApperance : 아이폰 키보드 색상을 변경
 */
const Input = ({
  placeholder,
  value,
  onSubmitEditing,
  onChangeText,
  onBlur,
}) => {
  const width = useWindowDimensions().width;
  return (
    <StyledInput
      width={width}
      placeholder={placeholder}
      maxLength={50}
      autoCapitalize="none" // 자동으로 대문자 전환
      autoCorrect={false} // 자동 수정 기능
      returnKeyType="done" // 키보드의 완료 버튼 설정
      keyboardAppearance="dark" // 아이폰 키보드 색상을 변경
      value={value}
      onSubmitEditing={onSubmitEditing}
      onChangeText={onChangeText}
      onBlur={onBlur}
    />
  );
};

const StyledInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.main,
}))`
  width: ${({ width }) => width - 40}px;
  height: 60px;
  margin: 3px 0;
  padding: 15px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.itemBackground};
  font-size: 25px;
  color: ${({ theme }) => theme.text};
`;

Input.propTypes = {
  placeholder: PropsTypes.string,
  value: PropsTypes.string.isRequired,
  onSubmitEditing: PropsTypes.func.isRequired,
  onChangeText: PropsTypes.func.isRequired,
  onBlur: PropsTypes.func.isRequired,
};

export default Input;
