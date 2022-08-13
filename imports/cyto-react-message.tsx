import React from 'react';
import { IconContext } from "react-icons";
import { BsCheck2, BsCheck2All } from 'react-icons/bs';
import Linkify from 'react-linkify';
import { BubbleArrowLeft } from '../icons/chat-bubble-left';
import { BubbleArrowRight } from '../icons/chat-bubble-right';
import { MessageTextArea } from './cyto-message-textarea';
import { CytoReactLinkAvatar } from './cyto-react-avatar';
import { Box, Flex, HStack, Link, Text, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { useChackraColor, useChackraGlobal } from './get-color';
import { Provider } from './provider';


const Done = React.memo<any>(() => {
  return(<IconContext.Provider value={{ color: "blue", className: 'done-icon' }}>
      <div>
        <BsCheck2 />
      </div>
    </IconContext.Provider>
  )
})
const DoneAllOpacity = React.memo<any>(() => {
  return(<IconContext.Provider value={{ color: "blue", className: 'done-icon' }}>
      <div>
        <BsCheck2All />
      </div>
    </IconContext.Provider>
  )
})
const DoneAll = React.memo<any>(() => {
  return(<IconContext.Provider value={{ color: "primary", className: 'done-all-icon' }}>
      <div>
        <BsCheck2All />
      </div>
    </IconContext.Provider>
  )
})

interface IMessage {
  date?: Date;
  text: any;
  align?: 'left' | 'right';
  arrow?: 'none' | 'left' | 'right';
  fill?: string;
  color?: string;
  src?: any;
  emoji?: any;
  name?: any;
  stage?: 'none' | 'sended' | 'received' | 'viewed';
  flexDivProps?: any;
  messageDivProps?: any;
  answerButton?: any;
}

export const CytoReactMessage = React.memo<any>(({
  text='Однообразные мелькают Все с той же болью дни мои, Как будто розы опадают И умирают соловьи. Но и она печальна тоже, Мне приказавшая любовь, И под ее атласной кожей Бежит отравленная кровь.',
  align = 'left',
  arrow = align,
  fill = align === 'right' ? '#dcdcdc' : '#cce4ff',
  color = '#000',
  src,
  emoji='💀',
  name,
  stage = 'none',
  flexDivProps = {},
  messageDivProps = {},
  answerButton,
}:IMessage) => {

  const globalStyle = useChackraGlobal();
  const textColor = useChackraColor(globalStyle.body.color);
  const gray900 = useChackraColor('gray.900');
  const white = useChackraColor('white');
  const colorBorderSelected = useChackraColor('primary');
  const colorGrayToWhite = useColorModeValue(gray900, white);
  const colorFocus = useColorModeValue(gray900, white);
  const colorWhiteToGray = useColorModeValue(white, gray900);
  const { colorMode, toggleColorMode } = useColorMode();

  const _stage = (
    stage === 'sended' ? <Done /> :
    stage === 'received' ? <DoneAllOpacity /> :
    stage === 'viewed' ? <DoneAll /> :
    null
  );

  return (<>
      <Flex maxW='sm' direction='column' alignItems='flex-end'>
        <HStack maxW='sm' display='flex' alignItems='flex-end' spacing={2}>
          {arrow === 'left' && <CytoReactLinkAvatar emoji={emoji} name={name} src={src} />}
          <Box {...flexDivProps} sx={{
            ...flexDivProps.style,
            width: 'calc(100% - 55px)',
            display: 'flex',
            alignItems: align === 'right' ? 'flex-end' : 'flex-start',
            justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
          }}>
            <Box
              padding='0.5rem 0.75rem'
              position='relative'
              w='auto'
              maxW='100%'
              wordWrap='break-word'
              wordBreak='break-word'
              borderRadius='2xl'
              boxSizing='border-box'
              sx={{
                clear: 'both',
                'hyphens': 'auto',
              }}  
              {...messageDivProps} style={{
              ...messageDivProps.style,
              backgroundColor: fill,
            }}>
              <Linkify componentDecorator={(decoratedHref: string, decoratedText: string, key: number) => <Link href={decoratedHref} children={decoratedText} key={key} onClick={(event) => {
                event.stopPropagation();
              }}/>}>
                <Text fontSize='sm' color={gray900}>
                  {text}
                </Text>
              </Linkify>
              {arrow === 'left' && <BubbleArrowLeft fill={fill} style={{position: 'absolute', left: -6, bottom: 0}} />}
              {arrow === 'right' && <BubbleArrowRight fill={fill} style={{position: 'absolute', right: -6, bottom: 0}} />}
            </Box>
          </Box>
          {align === 'right' && <CytoReactLinkAvatar emoji={emoji} name={name} src={src} />}
        </HStack>
        {answerButton}
        <MessageTextArea />
      </Flex>
    </>
  )
})
