import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { images } from "../images";

const IconButton = ({ onPressOut, type, id, completed }) => {
  const _onPressOut = () => {
    onPressOut(id);
  };
  return (
    <TouchableOpacity onPress={_onPressOut}>
      <Icon source={type} completed={completed} />
    </TouchableOpacity>
  );
};

const Icon = styled.Image`
  tint-color: ${({ theme, completed }) =>
    completed ? theme.done : theme.text};
  width: 30px;
  height: 30px;
  margin: 10px; // 사람의 손가락이 버튼을 정확하게 클릭하지 못하는 경우가 많기 때문에, 사용자 편의를 위해 버튼 주변을 클릭해도 정확히 클릭된 것으로 인식하도록 margin으로 여유공간 확보
`;

IconButton.defaultProps = {
  // props로 onPressOut이 전달되지 않았을 경우 문제가 발생하지않도록 defaultProps 를 이용해 onPressOut의 기본값을 지정
  onPressOut: () => {},
};

IconButton.propTypes = {
  type: PropTypes.oneOf(Object.values(images)).isRequired,
  onPressOut: PropTypes.func,
  id: PropTypes.string,
  completed: PropTypes.bool,
};

export default IconButton;
