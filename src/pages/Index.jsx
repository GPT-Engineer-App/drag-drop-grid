import React, { useState } from "react";
import { Box, Flex, Grid, GridItem, Text, Input, useColorModeValue } from "@chakra-ui/react";

const COLORS = ["red.500", "blue.500", "green.500", "yellow.500", "purple.500"];

const Draggable = ({ color, onDragStart }) => {
  return <Box bg={color} w="50px" h="50px" m={2} cursor="move" draggable onDragStart={onDragStart} />;
};

const Droppable = ({ onDrop, isOver, children }) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const hoverBg = useColorModeValue("gray.200", "gray.600");

  return (
    <GridItem bg={isOver ? hoverBg : bg} p={4} textAlign="center" onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
      {children}
    </GridItem>
  );
};

const Index = () => {
  const [gridSize, setGridSize] = useState(1);
  const [droppedColors, setDroppedColors] = useState({});

  const handleDragStart = (color) => (e) => {
    e.dataTransfer.setData("text/plain", color);
  };

  const handleDrop = (index) => (e) => {
    const color = e.dataTransfer.getData("text");
    setDroppedColors((prev) => ({ ...prev, [index]: color }));
  };

  return (
    <Flex>
      <Box w="200px" p={4} bg={useColorModeValue("gray.100", "gray.700")}>
        <Text mb={4} fontWeight="bold">
          Draggable Colors
        </Text>
        {COLORS.map((color) => (
          <Draggable key={color} color={color} onDragStart={handleDragStart(color)} />
        ))}
      </Box>
      <Box flex={1} p={4}>
        <Text mb={4} fontWeight="bold">
          Droppable Grid
        </Text>
        <Input type="number" value={gridSize} onChange={(e) => setGridSize(Number(e.target.value))} placeholder="Enter grid size" mb={4} />
        <Grid templateColumns={`repeat(${gridSize}, 1fr)`} gap={4}>
          {Array.from({ length: gridSize * gridSize }).map((_, index) => (
            <Droppable key={index} onDrop={handleDrop(index)} isOver={droppedColors[index]}>
              {droppedColors[index] && <Box bg={droppedColors[index]} w="100%" h="50px" />}
            </Droppable>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Index;
