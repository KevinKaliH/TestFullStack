import type { EventTypeFormModel } from "@modules/eventType/models/eventTypeForm";
import type { EventTypeModel } from "@shared/models/dtos/eventType.model";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface ModalFormProps {
  title: string;
  show: boolean;
  defaultValues?: EventTypeModel;
  handleClose: () => void;
  handleSaveChange: (data: EventTypeFormModel) => void;
}

const useModalEventTypeForm = (props: ModalFormProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventTypeFormModel>();

  useEffect(() => {
    reset({
      name: props.defaultValues?.name,
      description: props.defaultValues?.description,
    });
  }, [props.defaultValues]);

  const onSubmit = (data: EventTypeFormModel) => {
    props.handleSaveChange(data);
  };

  return {
    errors,
    register,
    onSubmit,
    handleSubmit,
  };
};

export default useModalEventTypeForm;
