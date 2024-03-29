import React, { useCallback, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@chakra-ui/avatar';
import { Flex, Heading, VStack, Link } from '@chakra-ui/layout';
import { ChevronDownIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useDropzone } from 'react-dropzone';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  AvatarBadge,
  chakra,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { UserContext } from 'context';
import IdContext from 'context/IdContect/IdContext';
import { UserDashboardLayout } from './components/UserDashboardLayout';

export const GovernmentID = () => {
  const history = useHistory();

  const { verifyID } = useContext(IdContext);
  const { userData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleImageUpload = e => {
    e.preventDefault();
    history.push('/idverify');
    verifyID();
    setTimeout(() => history.push('/upgrade'), 2000);
  };

  // function progressHandler(event) {
  //   console.log('Uploaded ' + event.loaded + ' bytes of ' + event.total);
  //   var percent = (event.loaded / event.total) * 100;
  //   console.log(percent);
  //   // _('progressBar').value = Math.round(percent);
  //   // _('status').innerHTML = Math.round(percent) + '% uploaded... please wait';
  // }

  // function completeHandler() {
  //   console.log('Complete');
  // }

  // const handleImageUpload = e => {
  //   const formData = new FormData();
  //   formData.append('file', e.target.files[0]);
  //   console.log(formData);
  //   let ajax = new XMLHttpRequest();
  //   ajax.upload.addEventListener('progress', progressHandler, false);
  //   ajax.addEventListener('load', completeHandler, false);
  // };

  const onDrop = useCallback(async acceptedFiles => {
    const file = acceptedFiles?.[0];

    if (!file) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      //   await uploadFromBlobAsync({
      //     blobUrl: URL.createObjectURL(file),
      //     name: `${file.name}_${Date.now()}`,
      //   })
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
      return;
    }

    setIsLoading(false);
    setMessage('File was uploaded 👍');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <UserDashboardLayout>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" fontSize="sm">
          <Flex alignItems="center" cursor="pointer" mr="4">
            <Button borderRadius="150px">
              <ArrowBackIcon size="35px" />
            </Button>
            <Text
              ml="2"
              color="lotusGrey"
              _hover={{
                color: 'black',
              }}
              fontFamily="fonts.cocogoose"
            >
              Back
            </Text>
          </Flex>
        </Flex>
        <Flex alignItems="center">
          <Avatar
            name={userData?.name}
            src={userData?.image}
            bg="teal.500"
            size="sm"
          >
            <AvatarBadge boxSize="0.9em" bg="lotusRed.100" />
          </Avatar>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg="transparent"
              _focus={{
                outline: 'none',
              }}
            >
              <chakra.span fontSize="xs" fontWeight="normal">
                {userData?.name}
              </chakra.span>
            </MenuButton>
            <MenuList fontSize="xs" minWidth="28">
              <MenuItem>Settings</MenuItem>
              <MenuItem>Edit</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Flex
        direction="column"
        justifyContent="center"
        position="relative"
        zIndex="100"
        h="100%"
        w="100%"
      >
        <VStack spacing="4" mx="auto" w="100%" textAlign="center">
          <Heading
            position="relative"
            fontSize="sm"
            _before={{
              content: '" "',
              height: '1px',
              width: '60px',
              bg: 'lotusGreen.400',
              position: 'absolute',
              bottom: '-5px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Means of Identification
          </Heading>
          <Text fontWeight="normal" fontSize="sm">
            Please kindly provide A valid Government issued ID card
          </Text>
          <Flex
            bg="#dadada"
            w={350}
            h={250}
            justify="center"
            align="center"
            p={50}
            m={2}
            borderRadius={5}
            textAlign="center"
            {...getRootProps()}
          >
            <input {...getInputProps()} onChange={handleImageUpload} />
            {isLoading ? (
              <Spinner />
            ) : isDragActive ? (
              <Text>Drop the files here...</Text>
            ) : (
              <Text fontSize="xs" color="#2D2D2D">
                Drag 'n' drop photo or document here, or{' '}
                <Link color="lotusBlue.400" fontWeight="bold">
                  Browse file
                </Link>
              </Text>
            )}
          </Flex>
          {(error || message) && (
            <Alert
              status={error ? 'error' : 'success'}
              w={250}
              borderRadius={5}
              m={2}
            >
              <AlertIcon />
              <AlertDescription w={200}>{error || message}</AlertDescription>
            </Alert>
          )}
          <Text fontSize="xs">
            I Don't have my Government issued Id card now.
          </Text>
          <Link fontSize="xs" color="lotusBlue.400" fontWeight="bold">
            Continue with other ID card types
          </Link>
        </VStack>
      </Flex>
    </UserDashboardLayout>
  );
};
