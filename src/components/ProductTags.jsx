import { useState } from 'react';
import styled from 'styled-components/';

export default function ProductTags({
  headline,
  tags,
  onUpdateTags,
  onDeleteTag,
}) {
  const [tagInput, setTagInput] = useState('');
  const [selectedTagIndex, setSelectedTagIndex] = useState(-1);

  const handleChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onUpdateTags(tagInput.toUpperCase());
      setTagInput('');
      setSelectedTagIndex(-1);
    }

    if (event.key === 'Backspace') {
      selectedTagIndex >= 0
        ? onDeleteTag(tags[selectedTagIndex])
        : onDeleteTag(tags[tags.length - 1]);
    }

    if (event.key === 'ArrowLeft') {
      selectedTagIndex <= 0
        ? setSelectedTagIndex(tags.length - 1)
        : setSelectedTagIndex(selectedTagIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      selectedTagIndex === tags.length - 1
        ? setSelectedTagIndex(0)
        : setSelectedTagIndex(selectedTagIndex + 1);
    }
  };

  return (
    <>
      <label htmlFor="tags">{headline}</label>
      <TagsContainer>
        {tags?.map((tag, index) => (
          <Tag key={index + tag} selected={selectedTagIndex === index}>
            {tag}
            <span onClick={() => onDeleteTag(tag)}>&times;</span>
          </Tag>
        ))}
        <Input
          type="text"
          name="tags"
          value={tagInput}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Write here"
        />
      </TagsContainer>
    </>
  );
}

const Input = styled.input`
  border: none;
  display: inline;
  margin: 0;
  width: 50%;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  background: white;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0.5rem 0 1rem;
  padding: 0.4rem;
  width: 50%;
`;

const Tag = styled.span`
  background: ${(prop) =>
    prop.selected ? 'var(--primary-color)' : 'var(--primary-bg)'};
  color: white;
  margin: 0.2rem;
  padding: 0.4rem 0.2rem 0.2rem;
`;
