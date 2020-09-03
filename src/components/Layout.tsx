import { Card, View, Text, Thumbnail } from 'native-base';
import styled from 'styled-components';

export const FlexCenter = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Flex = styled(View)`
  display: flex;
  flex-direction: row;
`;

export const Container = styled(View)`
  padding: 5px 10px;
`;

export const RoundedCard = styled(Card)`
  border-radius: 5px;
  padding: 15px;
`;

export const Section = styled(View)`
  margin-bottom: 10px;
  border-bottom-color: #f0f0f0;
  border-bottom-width: 1px;
`;

export const InfoContainer = styled(View)`
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 10px;
  border-bottom-color: #f0f0f0;
  border-bottom-width: 1px;
`;

export const RoundedThumbnail = styled(Thumbnail)`
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 20px;
`;

export const Title = styled(Text)`
  font-size: 17px;
  margin-bottom: 5px;
`;
